const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js", // 빌드 대상 파일
    output: { // 빌드된 파일 정보
        filename: "bundle.js",
        path: path.resolve(__dirname + "/build")
    },
    // 웹팩 자동 빌드 ( 실행방법: webpack-dev-server --hot )
    devServer: {
        contentBase: path.resolve("/build"), // /build의 데이터를
        index: "index.html", // index.html 파일을 index 파일로
        port: 9000 // 포트 9000 에서 서버를 열어 실시간 호스팅
    },
    mode: "none", // 웹팩 빌드 옵션

    /*
    빌드 옵션별 특징
    
    production: 최적화 빌드
    development: 빠르게 빌드
    none: 기능 미적용 (webpack build만 수행)
    
    */
    module: {
        rules: [{
                test: /\.(js|jsx)$/, // 파일 끝이 '.js' 나 '.jsx'인 파일에 대하여,
                exclude: "/node_modules", // node_modules 디렉토리 내에 있는 파일들은 제외하고
                use: ['babel-loader'] // babel-loader를 사용하여 파일을 읽어라
            },
            {
                test: /\.html$/, // 파일 끝이 '.html'인 파일에 대하여,
                use: [ // html-loader를 사용하여 파일을 최소화시킴 (html 파일 내용들을 1줄로 변경)
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/, // 파일 끝이 '.css'인 파일에 대하여,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
                // css-loader로 먼저 파일을 로드한 후, MiniCssExtractPlugin.loader로 로드한 파일을 추출함
                // css-loader만으로는 파일을 읽은 후 적용이 바로 되지 않음 (로드는 되지만 저장이 되지 않기 때문)
            },
            {
                test: /\.scss$/, // 파일 끝이 '.scss'인 파일에 대하여,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'scss-loader' ]
                // scss의 경우 scss가 파일을 읽어 css로 변환한 뒤 css와 동일하게 처리함
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", // /public/index.html 파일을 읽어
            filename: "index.html" // index.html로 출력하라
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new CleanWebpackPlugin() // 빌드시 불필요한 파일 삭제
    ]
}