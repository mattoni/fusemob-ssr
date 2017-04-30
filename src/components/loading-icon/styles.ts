export const styles =
  `.loadingAnimation {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 20rem;
  background: transparent;
  z-index: 1;
  transform: translateZ(0);
  transition: opacity .25s ease-in-out;
  pointer-events: none;
}
.loadingAnimation.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  transform: translate3d(0, 0, 0);
  pointer-events: auto;
}
.loadingAnimation > .icon {
  position: relative;
  margin: -25px 0 0 -25px;
  height: 50px;
  width: 50px;
  animation: main-loading-animation-animation 1000ms linear infinite;
}
.loadingAnimation > .icon, .loadingAnimation > .icon:before, .loadingAnimation > .icon:after {
  border: 2px solid rgba(255, 255, 255, 0);
  border-left-color: #4a9dd7;
  border-radius: 100%;
}
.loadingAnimation > .icon:before {
  position: absolute;
  top: 50%;
  left: 50%;
  content: '';
  margin: -21px 0 0 -21px;
  height: 42px;
  width: 42px;
  animation: main-loading-animation-animation 1000ms linear infinite;
}
.loadingAnimation > .icon:after {
  position: absolute;
  top: 50%;
  left: 50%;
  content: '';
  margin: -29px 0 0 -29px;
  height: 58px;
  width: 58px;
  animation: main-loading-animation-animation 2000ms linear infinite;
}

@keyframes main-loading-animation-animation {
  100% {
    transform: rotate(360deg);
  }
}`;
