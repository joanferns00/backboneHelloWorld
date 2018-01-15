(function($){
    //View for the button on the UI. It handles the click event.
    var userInputView = Backbone.View.extend({
        el: '#userInput',
        initialize: function(){
            this.helloListView = new helloListView();
        },
        events: {'click button' : 'addToHelloCollection'},
        addToHelloCollection: function(e){
            console.log('button clicked');
            var hello = new Hello({
                name: this.$('input').val()
            });
            this.helloListView.collection.add(hello)
        }
    })

    //Model for the input element on the UI
    var Hello = Backbone.Model.extend({
        initialize: function(){
            this.name = 'name'
        }
    })

    //View for the list that is generated when the button is clicked. Creating an li element
    var helloView = Backbone.View.extend({
        tagName: 'li',
        render: function(){
            $(this.el).html('Hello ' + this.model.get('name'));
            return this;
        }
    });

    //
    var helloList = Backbone.Collection.extend({
        model: Hello
    });

    //
    var helloListView = Backbone.View.extend({
        el: '#helloList',
        initialize: function(){
            _.bindAll(this, 'render', 'appendToHelloUL')
            this.collection = new helloList();
            this.collection.bind('add', this.appendToHelloUL)
        },
        render: function(){
            $.each(this.collection.models, function(i, helloModel){
                self.appendToHelloUL(helloModel)
            })
        },
        appendToHelloUL: function(helloModel){
            var helloViewToUL = new helloView({
                model: helloModel
            });
            $(this.el).append(helloViewToUL.render().el);
        }
    });
    new userInputView();
    console.log('in here')
})(jQuery)
