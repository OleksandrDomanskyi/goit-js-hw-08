import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const LOCAL_STORAGE_KEY = "videoplayer-current-time";
const passedTime = localStorage.getItem(LOCAL_STORAGE_KEY);

if (passedTime) {
    player.setCurrentTime(passedTime);
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(event) {
    const currentTime = event.seconds;
    localStorage.setItem(LOCAL_STORAGE_KEY, currentTime);
};