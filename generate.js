const fs = require('fs');
const path = require('path');
const cssGen = require('css-generator');
const inquirer = require('inquirer');

const questions = [
    {
      type: 'input',
      name: 'bodyBackgroundColor',
      message: "What background color do you want?",
      default: 'rgb(211, 211, 211)'
    },
    {
      type: 'input',
      name: 'contentBackgroundColor',
      message: "What content background color do you want?",
      default: '#a08a71'
    },
    {
      type: 'input',
      name: 'box1backgroundColor',
      message: "First Box background color?",
      default: '#FAEBD7'
    },
    {
      type: 'input',
      name: 'box1fontColor',
      message: "First Box font color?",
      default: 'black'
    },
    {
      type: 'input',
      name: 'box2backgroundColor',
      message: "Second Box background color?",
      default: '#cdb8e0'
    },
    {
      type: 'input',
      name: 'box2fontColor',
      message: "Second Box font color?",
      default: 'black'
    },
    {
      type: 'list',
      name: 'boxPattern',
      message: "Box Pattern?",
      choices: [
            'doubleBubble', 
            'geometricLeaves', 
            'herrigbone', 
            'interlaced', 
            'moroccanFlower', 
            'niceSnow', 
            'pixelHeart'
        ],
        default: 'interlaced'
    },
    {
      type: 'list',
      name: 'headlineFont',
      message: "Headline Font?",
      choices: ['DancingScript', 'Biloxi', 'Amantic'],
      default: 'DancingScript'
    },
    {
      type: 'list',
      name: 'subheadlineFont',
      message: "Subheadline Font?",
      choices: ['DancingScript', 'Biloxi', 'Amantic'],
      default: 'Amantic'
    },
    {
      type: 'list',
      name: 'textFont',
      message: "Text Font?",
      choices: ['DancingScript', 'Biloxi', 'Amantic'],
      default: 'Amantic'
    }
]

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
        console.log('File deleted!');
    });

    fs.appendFile(outputDir + 'theme.css', css.getOutput(), (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
}

function getUserData() {
    inquirer.prompt(questions).then(answers => {
        Object.keys(answers).forEach((answer) => {
            console.log(`${answer}: ${answers[answer]}`);
        });
        console.log('Generating Files...');
        generateCSS(answers);
        console.log('Done');
    });
}

getUserData();
