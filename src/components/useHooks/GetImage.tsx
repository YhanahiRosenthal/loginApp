import icons from '../json/icons.json';

const images = () => {

    const iconPin = JSON.parse(JSON.stringify(icons).replaceAll('{base_image_url}', process.env.REACT_APP_ASSETS_BASE_URL || ''));
    return iconPin;
}

const getImage = () => {

    const anima = images();
    const animals: string[] = [];

    for (var icon in anima) {
        if (anima[icon]) {
            animals.push(anima[icon]);
        }
    }

    return animals
}

export {
    getImage
}