const images = (icon: object) => {

    const iconPin = JSON.parse(JSON.stringify(icon).replaceAll('{base_image_url}', process.env.REACT_APP_ASSETS_BASE_URL || ''));
    return iconPin;
}

const getImage = (icon: any) => {

    const anima = images(icon);
    const animals: string[] = [];

    for (let icon in anima) {
        if (anima[icon]) {
            animals.push(anima[icon]);
        }
    }

    return animals
}

export {
    getImage
}