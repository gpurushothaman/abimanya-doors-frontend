const initialState = {
    storeData: null,
    location: null,
    design: null,
    subDesign: null,
    model: null,
    shade: null,
    frame: null,
    smartMenuAction: {
        doorOnlyStatus : true,
        canvasBackgroundThemeStatus : false,
        canvasBackgroundTheme : "light"
    },
    canvasBackgroundTheme : {
        dark : "#000000",
        light : "#ffffff"
    },
    wall:{
        width : 850, 
        height : 2100,
        blendWidth : Math.max(0, Math.min(1,  (850 - 600) / (1200 - 600))),
        blendHeight : Math.max(0, Math.min(1,  (2100 - 1800) / (2400 - 1800))),
        heightMin : 1800,
        heightMax : 2400,
        widthMin : 600,
        widthMax : 1200,
        thicknessMax : 260,
        thicknessMin : 140,
        thickness : 140,
        blendThickness : 0
    },
    selectedPreviousModel:"default"
};

export default initialState;