$(document).ready(function(){
   app.init();
});

var app = new function(){ 
    var self = this;
    
    this.init = function(){
        this.elementsArray = [];
        this.addButton = $(".add-button");
        this.inputElement = $(".input-element");
        this.errorPlace = $(".error-place");
        this.ElementsList = $(".elements-list");
        
        this.errorPlaceMessage = {
            itemExist: "The item is already in your shopping list.",
            itemEmpty: "The item is empty."
        };
        
        $(this.addButton).on("click", function(){
            if(self.checkValid()){
                self.elementsArray.push(self.inputElement.val());
                self.ElementsList
                    .append("<li class='elements-list__element'>"
                    + self.elementsArray[self.elementsArray.length-1]
                    + "<span class='elements-list__element-remove'>x</span></li>");
            
                $(self.ElementsList).find("span").unbind().click(function(){
                    $(this).parent().remove();
                });
            }
        });
        
        $(this.inputElement).keypress(function(e){
            if(e.which == 13){
                $(self.addButton).click();
            }
        });
        
    };
    
    this.checkValid = function(){
        if($.inArray(self.inputElement.val(), self.elementsArray) !== -1){
            self.errorPlace.html(self.errorPlaceMessage.itemExist);
            return false;
        }
        else if(self.inputElement.val() == ""){
            self.errorPlace.html(self.errorPlaceMessage.itemEmpty);
            return false;
        }
        else{
            self.errorPlace.empty();
            return true;
        }
    };
};