const expect = require('chai').expect;
const App = require('../src/js/model/app');

var jsdom = require('jsdom');
var document = jsdom.jsdom("");
var window = document.defaultView;

global.window = window;
global.$ = require('jquery');

describe("App",function () {
    beforeEach(function () {
        $('body').html('')
        
        var elementList = '<ul class="elements-list"></ul>';
        var errorPlace = '<div class="error-place"></div>';
        var inputElement = '<input type="text" class="input-element">'

        $('body').append(elementList, errorPlace, inputElement);
        
        App.init();
    });
    
    it("Should exists",function () {
        //noinspection BadExpressionStatementJS
        expect(App).to.exist;
    });
    
    it("Should load JSON", function () {
        App.jsonFile = {"elements": ["example 1", "example 2"]};
        App.loadJson();
        expect(App.elementsArray[0]).to.equal('example 1');
        expect(App.elementsArray[1]).to.equal('example 2');
    });
    
    it("Should add an element", function () {
        App.addElement("40");
        expect(App.elementsArray[0]).to.equal('40');
        expect($(".elements-list li").text()).to.equal('40x');
    });
    
    it("Should remove an element", function () {
        before(function(){
            App.addElement("40");
        });
        
        App.removeElement($(".elements-list").find("span"));
        expect(App.elementsArray[0]).to.not.exist;
        expect($(".elements-list li").text()).to.equal('');
    });
    
    it("Should check validity an correct element and return false", function () {
        App.inputElement[0].value = "40";
        expect(App.checkValid()).to.equal(true);
    });
    
    it("Should check validity an empty element and return false", function () {
        expect(App.checkValid()).to.equal(false);
    });
    
    it("Should check validity an existing element and return false", function () {
        App.elementsArray[0] = "40";
        App.inputElement[0].value = "40";
        expect(App.checkValid()).to.equal(false);
    });
});
