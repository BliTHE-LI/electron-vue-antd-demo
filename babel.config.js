module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'babel-plugin-import',
            { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
        ]
    ]
}
