const fs = require('fs');
const path = require('path');
const cssGen = require('css-generator');
const inquirer = require('inquirer');

const questions = require('./questions');

function generateCSS(inputData) {
    const options = {
        indentation: '    ' // 2 spaces
    }
    const css = cssGen.create(options);
    const outputDir = path.join(__dirname, './frontend/styles/');
    css.addRule('body', {
        'background-color': inputData.bodyBackgroundColor
    });
    css.addRule('.content', {
        'background-color': inputData.contentBackgroundColor
    });

    css.addRule('.box-color-one', {
        'background-color': inputData.box1backgroundColor,
        'background-blend-mode': 'multiply',
        'background-image': `url('../img/texture/${inputData.boxPattern}.png')`,
        'color': inputData.box1fontColor
    });

    css.addRule('.box-color-two', {
        'background-color': inputData.box2backgroundColor,
        'background-blend-mode': 'multiply',
        'background-image': `url('../img/texture/${inputData.boxPattern}.png')`,
        'color': inputData.box2fontColor
    });

    css.addRule('p', {
        'font-family': inputData.textFont
    });

    css.addRule('.headline-font', {
        'font-family': inputData.headlineFont
    });

    css.addRule('.subheadline-font', {
        'font-family': inputData.subheadlineFont
    });

    css.addRule('.tick', {
        'font-family': inputData.headlineFont
    });

    css.addRaw(`@font-face {
        font-family: '${inputData.headlineFont}';
        src: url('../font/${inputData.headlineFont}.woff') format('woff');
    }`);

    css.addRaw(`@font-face {
        font-family: '${inputData.subheadlineFont}';
        src: url('../font/${inputData.subheadlineFont}.woff') format('woff');
    }`);

    css.addRaw(`@font-face {
        font-family: '${inputData.textFont}';
        src: url('../font/${inputData.textFont}.woff') format('woff');
    }`);

    fs.unlink(outputDir + 'theme.css', function (err) {
        if (err) throw err;
    });

    fs.appendFile(outputDir + 'theme.css', css.getOutput(), (err) => {
        if (err) throw err;
    });
}

function generateJS(answers) {
    const string = `
        const weddingID = '${answers.weddingID}';
        const brideName = '${answers.bride}';
        const groomName = '${answers.groom}';
        const year = ${answers.year};
        const month = ${answers.month};
        const day = ${answers.day};
        const hour = ${answers.hour};
    `;
    const outputDir = path.join(__dirname, './frontend/js/');

    fs.unlink(outputDir + 'config.js', function (err) {
        if (err) throw err;
    });

    fs.appendFile(outputDir + 'config.js', string, (err) => {
        if (err) throw err;
    });

}

function getUserData() {
    inquirer.prompt(questions).then(answers => {
        Object.keys(answers).forEach((answer) => {
            console.log(`${answer}: ${answers[answer]}`);
        });
        console.log('Generating Files...');
        generateCSS(answers);
        generateJS(answers)
        console.log('Done');
    });
}

getUserData();
