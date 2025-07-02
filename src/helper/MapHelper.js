import AMapLoader from "@amap/amap-jsapi-loader";
import {mapConfig} from "/@/constants/microsite/map.js";
export class MapHelper {
    static instance = null;
    searchKeyword = '';
    selectedLocation = '';
    map = null;
    auto = null;
    placeSearch = null;
    inputId = null;
    lnglat = null;
    isView = false;

    static getInstance() {
        if (!MapHelper.instance) {
            MapHelper.instance = new MapHelper();
        }
        return MapHelper.instance;
    }

    /**
     * 初始化Map
     * @param id 容器id
     */
    async initMap(mapId, inputId, isView) {
        this.inputId = inputId;
        this.isView = isView;
        const AMap = await AMapLoader.load(mapConfig);
        this.map = new AMap.Map(mapId, { resizeEnable: true, showLabel: true, zoom: 12});
        AMap.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], () => {
            // 搜索框自动完成类
            this.auto = new AMap.AutoComplete({input: inputId});
            this.placeSearch = new AMap.PlaceSearch({map: this.map});
            this.auto.on("select", this.handleAutoCompleteSelect.bind(this));
            this.map.on("click", (event) => {
                this.handleMapClick(event.lnglat);
            });
            // this.handlerAddress();
        });
    }

    /**
     * 处理地址经纬度
     */
    handlerAddress() {
        if (!this.address) return;
        let parts = this.address.split(",");
        let lat = parseFloat(parts[0]);
        let ant = parseFloat(parts[1]);
        let lnglat = new AMap.LngLat(lat, ant);
        this.handleMapClick(lnglat);
    }

    /**
     * 点击地图
     * @param lnglat
     * @param isShow 是否是查看定位
     */
    handleMapClick(lnglat, isShow) {
        if (this.isView && !isShow) return;
        isShow && this.map && this.map.setCenter(lnglat);
        const geocoder = new AMap.Geocoder();
        geocoder.getAddress(lnglat, (status, result) => {
            if (status !== "complete" || !result.regeocode) return;
            const address = result.regeocode.formattedAddress;
            this.addMarker(lnglat, address);
        })
    }

    /**
     * 添加标记
     * @param lnglat    经纬度
     * @param address   地址
     */
    addMarker(lnglat, address) {
        this.Marker && this.map.remove(this.Marker);
        this.Marker = new AMap.Marker({
            position: lnglat,
            draggable: true,
            label: {
                content: address,
                direction: "top",
                offset: new AMap.Pixel(-10, 0), // 设置标记文本偏移量
            },
        });
        this.address = address;
        this.setSearchWord(address);
        this.lnglat = lnglat;
        this.selectedLocation = `${lnglat.toString()},${address}`;
        this.Marker.setMap(this.map);
        this.Marker.on("dragend", this.handleMarkerDragEnd.bind(this));
    }

    /**
     * 选中后给搜索框赋值
     * @param address
     */
    setSearchWord(address) {
        const searchEl = document.getElementById(this.inputId);
        if (!searchEl) return;
        searchEl.value = address;
    }

    handleAutoCompleteSelect(e) {
        this.placeSearch.setCity(e.poi.adcode);
        this.placeSearch.search(e.poi.name);
    }

    handleMarkerDragEnd(event) {
        const newPosition = event.lnglat;
        this.handleMapClick({ lnglat: newPosition });
    }

    /**
     * 获取地址信息
     */
    getAddressInfo() {
        return {
            address: this.address,
            lnglat: this.setLngLatToString(this.lnglat)
        }
    }

    /**
     * 转换为字符串
     * @param lnglat
     * @returns {string}
     */
    setLngLatToString(lnglat) {
        if(!lnglat) return '';
        return lnglat.lng + ',' + lnglat.lat;
    }

    /**
     * 经纬度string类型转换对象
     * @param lnglat String  lng,lat
     * @returns {AMap.LngLat}
     */
    formatLngLat(lnglat) {
    const list = lnglat.split(',');
    const lng = list[0];
    const lat  = list[1];
    return new AMap.LngLat(lng, lat);
    }

    /**
     * 显示位置
     * @param lnglat
     */
    showPosition(lnglat) {
        const pos = this.formatLngLat(lnglat);
        this.handleMapClick(pos, true);
    }

    /**
     * 销毁
     */
    destroy() {
        this.destroyMarker();
        this.destroyMap();
        this.address = '';
        const searchEl = document.getElementById(this.inputId);
        searchEl && (searchEl.value = '');
    }

    destroyMarker() {
        if (!this.Marker) return;
        this.Marker.off("dragend", this.handleMarkerDragEnd.bind(this));
        this.Marker.setMap(null);
        this.Marker = null;
    }

    destroyMap() {
        if (!this.map) return;
        this.auto.off("select", this.handleAutoCompleteSelect.bind(this));
        this.map.off("click", this.handleMapClick);
        this.map.destroy();
        this.map = null;
    }
}
