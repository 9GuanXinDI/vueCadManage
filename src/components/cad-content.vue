<template>
  <div class="box">
    <div class="valve-box">
      <div class="item-one"></div>
      <!-- <div class="right-triangle right-one"></div>
      <div class="right-triangle right-two"></div>
      <div class="right-triangle right-three"></div>
      <div class="left-triangle left-one"></div>
      <div class="left-triangle left-two"></div>
      <div class="left-triangle left-three"></div>
      <div class="top-triangle top-one"></div>
      <div class="top-triangle top-two"></div>
      <div class="bottom-triangle bottom-one"></div> -->
      <svg width="100%" height="100%" class="item-one-line">
        <line x1="2" y1="0.5%" x2="100" y2="0.5%" style="stroke: #5de594; stroke-width: 1"></line>
        <line x1="100" y1="0.5%" x2="100" y2="25%" style="stroke: #5de594; stroke-width: 1"></line>

        <line x1="40" y1="3%" x2="40" y2="25%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="40" y1="3%" x2="160" y2="30%" style="stroke:#997A16;stroke-width:1"></line>

        <line x1="160" y1="3%" x2="160" y2="41%" style="stroke:#997A16;stroke-width:1"></line>
        
        <line x1="160" y1="19%" x2="700" y2="19%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="230" y1="19%" x2="230" y2="22%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="250" y1="19%" x2="250" y2="40%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="250" y1="40%" x2="900" y2="40%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="350" y1="19%" x2="350" y2="22%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="370" y1="19%" x2="370" y2="6%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="370" y1="6%" x2="900" y2="6%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="470" y1="19%" x2="470" y2="22%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="490" y1="19%" x2="490" y2="9%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="490" y1="9%" x2="900" y2="9%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="620" y1="19%" x2="620" y2="12%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="620" y1="12%" x2="900" y2="12%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="700" y1="19%" x2="700" y2="23%" style="stroke:#997A16;stroke-width:1"></line>

        <line x1="160" y1="41%" x2="700" y2="41%" style="stroke:#997A16;stroke-width:1"></line>


        <line x1="230" y1="41%" x2="230" y2="44%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="250" y1="41%" x2="250" y2="27%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="250" y1="27%" x2="900" y2="27%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="350" y1="41%" x2="350" y2="44%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="370" y1="41%" x2="370" y2="30%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="370" y1="30%" x2="900" y2="30%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="470" y1="41%" x2="470" y2="44%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="490" y1="41%" x2="490" y2="33%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="490" y1="33%" x2="900" y2="33%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="620" y1="41%" x2="620" y2="36%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="620" y1="36%" x2="900" y2="36%" style="stroke:#997A16;stroke-width:1"></line>
        <line x1="700" y1="41%" x2="700" y2="44%" style="stroke:#997A16;stroke-width:1"></line>
      </svg>
      <div class="DMC-box"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "../style/mixins.scss";
.box {
  width: 100%;
  height: 100%;
  // padding: vw(20) 0;
}
.DMC-box {
  position: absolute;
  left: 10%;
  bottom: 0px;
  width: vw(120);
  height: vw(150);
  border: 1px solid #ddd;
}
.valve-box {
  position: relative;
  height: 100%;

  .item-one {
    position: absolute;
    top: 0;
    left: vw(20);
    width: vw(30);
    height: vw(10);
    border: 1px solid #76c5cb;
  }

  .item-one-line {
    position: absolute;
    top: 0;
    left: vw(50);
    display: block;
  }
}

.right-triangle {
  width: 0;
  height: 0;
  border-left: vw(23) solid #fff;
  border-top: vw(8) solid transparent;
  border-bottom: vw(8) solid transparent;
}

.left-triangle {
  width: 0;
  height: 0;
  border-right: vw(23) solid #fff;
  border-top: vw(8) solid transparent;
  border-bottom: vw(8) solid transparent;
}

.top-triangle {
  width: 0;
  height: 0;
  border-bottom: vw(23) solid #fff;
  border-left: vw(8) solid transparent;
  border-right: vw(8) solid transparent;
}

.bottom-triangle {
  width: 0;
  height: 0;
  border-top: vw(23) solid #fff;
  border-left: vw(8) solid transparent;
  border-right: vw(8) solid transparent;
}

.right-one {
  position: absolute;
  top: vw(-3);
  left: vw(420);
  z-index: 9999;
}

.right-two {
  position: absolute;
  top: vw(47);
  left: vw(460);
  z-index: 9999;
}

.right-three {
  position: absolute;
  top: vw(147);
  left: vw(120);
  z-index: 9999;
}

.left-one {
  position: absolute;
  top: vw(147);
  left: vw(270);
  z-index: 9999;
}

.left-two {
  position: absolute;
  top: vw(192);
  left: vw(230);
  z-index: 9999;
}

.left-three {
  position: absolute;
  top: vw(192);
  left: vw(475);
  z-index: 9999;
}

.top-one {
  position: absolute;
  top: vw(65);
  left: vw(201);
  z-index: 9999;
}

.top-two {
  position: absolute;
  top: vw(65);
  left: vw(218);
  z-index: 9999;
}

.bottom-one {
  position: absolute;
  top: vw(65);
  left: vw(542);
  z-index: 9999;
}
</style>
