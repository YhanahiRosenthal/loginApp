import enLanguageJson from '../jsons/languaje_en-en.json';
import styless from '../jsons/styles.json;';

interface ThemeLabelFont {
    [key: string]: string
}

interface Theme {
    [theme: string]: { [property: string]: string };
}

interface Styles {
    [key: string]: string;
  }


  const getStyles = () => {

    const finalStyles = JSON.parse(JSON.stringify(styless).replaceAll('{base_image_url}', process.env.REACT_APP_ASSETS_BASE_URL || ''));
    return finalStyles;
}

//Hook for app labeling.
const useLabel = () => {

    //The method recieves a label and returns the label in the language recieved by backend.
    //If not recieve backend, returns the label passed as parameter.
    const wLabel = (label: string): string => {
        const language: ThemeLabelFont = enLanguageJson;
        if(label in language){
            return language[label];
        }else{
            return label;
        }
    }

    return wLabel

}

const useStyles = () => {

    const wStyle = (theme: string) => {

        const style: any = getStyles();
        const inTheme: any = theme.split('.');

        let styles = style;

        for (let prop of inTheme) {
            if (styles[prop]) {
                styles = styles[prop];
            } else {
                return style;
            }
        }

        return styles;
    }

    return wStyle
}

export {
    useLabel,
    useStyles
};
