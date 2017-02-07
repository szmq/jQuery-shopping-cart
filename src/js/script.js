$(document).ready(function(){
   app.init();
});

var app = new function(){ 
    var self = this;
    
    this.init = function(){
        this.elementsArray = [];
        this.jsonFile = "./json/shopping-cart.json";
        
        this.addButton = $(".add-button");
        this.inputElement = $(".input-element");
        this.errorPlace = $(".error-place");
        this.ElementsList = $(".elements-list");
        this.pdfButton = $(".get-pdf");
        
        this.errorPlaceMessage = {
            itemExist: "The item is already in your shopping list.",
            itemEmpty: "The item is empty."
        };
        
        $.getJSON(this.jsonFile, function(data){
            self.jsonFile = data;
            self.loadJson();
        });
        
        $(this.addButton).on("click", function(){
            if(self.checkValid()){
                self.addElements(self.inputElement.val());
            }
        });
        
        $(this.inputElement).keypress(function(e){
            if(e.which == 13){
                $(self.addButton).click();
            }
        });
        
        $(this.pdfButton).on("click", function(){
            self.generatePDF();
        });
    };
    
    this.generatePDF = function(){
        var doc = new jsPDF();
        doc.text(10, 10, "Product list");
        self.elementsArray.forEach(function(employee, i){
            doc.text(10, 20 + (i * 7), i+1 + ". " + employee);
        });
        doc.save('products.pdf');
    };
    
    this.addElements = function(element){
        self.elementsArray.push(element);
            self.ElementsList
                .append("<li class='elements-list__element'>"
                + self.elementsArray[self.elementsArray.length-1]
                + "<span class='elements-list__element-remove'>x</span></li>").children().last().hide().show(400);

        $(self.ElementsList).find("span").unbind().click(function(){
            var strParentx = $(this).parent().text(); // get parent text with span x
            var strParent = strParentx.substring(0, strParentx.length - 1); // remove span x

            var index = $.inArray(strParent, self.elementsArray);
            self.elementsArray.splice(index, 1);

            $(this).parent().hide(400);
        });
    };
    
    this.loadJson = function(){
        for(var element in self.jsonFile.elements) {
            self.addElements(self.jsonFile.elements[element]);
        }
    };
    
    this.checkValid = function(){
        if($.inArray(self.inputElement.val(), self.elementsArray) !== -1){
            self.errorPlace.html(self.errorPlaceMessage.itemExist).hide().fadeIn(400);
            return false;
        }
        else if(self.inputElement.val() == ""){
            self.errorPlace.html(self.errorPlaceMessage.itemEmpty).hide().fadeIn(400);;
            return false;
        }
        else{
            self.errorPlace.fadeOut(400);
            return true;
        }
    };
};