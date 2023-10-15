module.exports = {
    assets: ['./assets/fonts/']
}

declare module '*.jpg' {
    const value: any;
    export = value;
}
