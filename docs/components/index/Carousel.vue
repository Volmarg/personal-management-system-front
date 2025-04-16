<template>
  <div class="carousel">
    <div class="container">

      <input
          v-for="(element, idx) in elements"
          type="radio"
          name="slider"
          :key="idx"
          :id="`item-${idx+1}`"
          :checked="idx===1"
      >

      <div class="cards">
        <label
            v-for="(element, idx) in elements"
            :key="idx"
            class="card"
            :for="`item-${idx+1}`"
            :id="`song-${idx+1}`"
        >
          <img :src="element.src" />
        </label>

      </div>
      <div class="player">
        <div class="upper-part">
          <div class="info-area" id="test">
            <label
                v-for="(element, idx) in elements"
                :key="idx"
                class="song-info"
                :id="`song-info-${idx+1}`"
            >
              <div class="title">{{ element.text }}</div>
              <div class="sub-line">
                <div class="subtitle">{{ element.text }}</div>
                <div class="time">4.05</div>
              </div>
            </label>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Based on {@link https://codepen.io/aybukeceylan/pen/RwrRPoO}, thus some weird class names etc.
 * Limitation: the css is hardcoded for 3 elements max, and I don't feel like I want to mess up with that, 3 is enough
 */
export default {
  data() {
    return {
      elements: [
        {
          src:  "assets/project/screenshots/contacts.png",
          text: "Module: contacts"
        },
        {
          src:  "assets/project/screenshots/dashboard.png",
          text: "Dashboard"
        },
        {
          src:  "assets/project/screenshots/calendar.png",
          text: "Module: calendar"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.carousel {
  display: flex;
  justify-content: center;

  input[type=radio] {
    display: none;
  }

  .card {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    margin: auto;
    transition: transform .4s ease;
    cursor: pointer;
  }

  .container {
    $height: 600px;
    width: 100%;
    max-width: 800px;
    max-height: $height;
    height: $height;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .cards {
    position: relative;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  #item-1:checked ~ .cards #song-3, #item-2:checked ~ .cards #song-1, #item-3:checked ~ .cards #song-2 {
    transform: translatex(-40%) scale(.8);
    opacity: .4;
    z-index: 0;
  }

  #item-1:checked ~ .cards #song-2, #item-2:checked ~ .cards #song-3, #item-3:checked ~ .cards #song-1 {
    transform: translatex(40%) scale(.8);
    opacity: .4;
    z-index: 0;
  }

  #item-1:checked ~ .cards #song-1, #item-2:checked ~ .cards #song-2, #item-3:checked ~ .cards #song-3 {
    transform: translatex(0) scale(1);
    opacity: 1;
    z-index: 1;

    img {
      box-shadow: 0px 0px 5px 0px rgba(81, 81, 81, 0.47);
    }
  }

  .player {
    border-radius: 8px;
    min-width: 320px;
    padding: 16px 10px;
    margin-left: 120px;
  }

  .upper-part {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    height: 36px;
    overflow: hidden;
  }

  .play-icon {
    margin-right: 10px;
  }

  .song-info {
    width: calc(100% - 32px);
    display: block;
  }

  .song-info .title {
    color: #C6C5C6;
    font-size: 14px;
    line-height: 24px;
  }

  .sub-line {
    opacity: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .subtitle, .time {
    font-size: 12px;
    line-height: 16px;
    color: #C6C5C6;
  }

  .time {
    font-size: 12px;
    line-height: 16px;
    color: #A5A5A5;
    font-weight: 500;
    margin-left: auto;
  }

  .progress-bar {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress {
    display: block;
    position: relative;
    width: 60%;
    height: 100%;
    background-color: #2992DC;
    border-radius: 6px;
  }

  .info-area {
    width: 100%;
    position: absolute;
    top: 0;
    left: 30px;
    transition: transform .4s ease-in;
  }

  #item-2:checked ~ .player #test {
    transform: translateY(0);
  }

  #item-2:checked ~ .player #test {
    transform: translateY(-40px);
  }

  #item-3:checked ~ .player #test {
    transform: translateY(-80px);
  }
}
</style>