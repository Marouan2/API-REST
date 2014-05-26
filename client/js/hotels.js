var $hotels 		= $('#hotels'),
	$citys 			= $('#citys'),
	hotels 			= null,
	citys 			= null,
	currentCitytId 	= null,
	cityListView 	= null,
	hotelListView 	= null,
	serverUrl		= 'http://localhost/api/server/index.php/';



Hotel = Backbone.Model.extend({
	defaults: {
		id: null,
		city_id : null,
		hotel: '',
		address: '',
		description: ''
	},
	urlRoot: serverUrl + 'hotel'
});


HotelCollection = Backbone.Collection.extend({
	model: Hotel,
	url: serverUrl + 'hotel'
});


City = Backbone.Model.extend({
	defaults: {
		id: null,
		name: ''
	},
	urlRoot: serverUrl + 'city'
});

CityCollection = Backbone.Collection.extend({
	model: City,
	url: serverUrl + 'city' 
});

/*
 * View for single city item (LI)
 */
CityItem = Backbone.View.extend({
	tagName: 'li',
	className: "tree-toggler nav-header",
	initialize: function() {
		this.render = _.bind(this.render, this);

		this.template = _.template($('#city-item').html());

		this.model.bind('change', this.render);
	},
	events: {
		'dblclick a': 'edit',
		'click a': 'loadHotels'
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	edit: function() {
		new CityDialog({model: this.model}).show();
	},
	loadHotels: function() {
		$citys.find('li.active').removeClass('active');
		this.$el.addClass('active');
		$('#city-title span').html(this.model.get('name'));
		$hotels.empty();
		hotels = new HotelCollection();
		currentCityId = this.model.id;
        hotels.fetch({data: {city: this.model.id}, processData: true, success: function() {
			hotelListView = new HotelList({
				collection: hotels,
				el: $hotels
			});
			hotelListView.render();
		}});
		event.preventDefault();
        var url = event.target.pathname;
        Backbone.history.navigate(url, { trigger: true });
	}
});


/*
 * View city list
 */
CityList = Backbone.View.extend({
	initialize: function() {
		_(this).bindAll('add', 'remove');

		this._citys = [];
		this.collection.each(this.add);
		this.collection.bind('add', this.add);
    	this.collection.bind('remove', this.remove);
	},
	render: function() {
		this._rendered = true;
		_(this._citys).each(function(item) {
			$citys.append(item.render().el);
		});
	},
	
	add: function(city) {
		var cityItem = new CityItem({model: city});
		this._citys.push(cityItem);

		if (this._rendered) {
			this.$el.append(cityItem.render().el);
		}
	},
	
	remove: function(city) {
		var view = _(this._citys).select(function(cv) { return cv.model === city; })[0];
		if (this._rendered) {
			$(view.el).remove();
		}

		$citys.find('li:nth-child(2)').find('a').trigger('click');
	}
});


/*
 * View Modal dialog city
 */
CityDialog = Backbone.View.extend({
	
	events: {
		'click .save-action': 'save',
		'click .close,.close-action': 'close',
		'change input': 'modify'
	},
	initialize: function() {
		this.template = _.template($('#city-dialog').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	show: function() {
		$(document.body).append(this.render().el);
	},
	
	close: function() {
		this.remove();
	},
	
	save: function() {
		
		if (null == this.model.id) {
			citys.create(this.model);
		} else {
			this.model.save();
		}
		this.remove();
	},
	
	modify: function(e) {
		var attribute = {};
		attribute[e.currentTarget.name] = e.currentTarget.value;
		this.model.set(attribute);
	}
});



/*
 * Single hotel view
 */
HotelItem = Backbone.View.extend({
	tagName: 'p',
	initialize: function() {
		this.render = _.bind(this.render, this);
		this.template = _.template($('#hotel-item').html());
		this.model.bind('change', this.render);
	},
	events: {
		
		'change input': 'modify',
		'click a.edit-action': 'edit',
		'click a.delete-action': 'delete',
		'click a.detail-action': 'loadDescription'
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	edit: function() {
		new HotelDialog({model: this.model}).show();
	},
	modify: function(e) {
		var attribute = {};
		attribute[e.currentTarget.name] = e.currentTarget.value;
		this.model.set(attribute);
	},
	delete: function (e) {
	if (confirm('Are you sure you want to delete that document?')) {
		this.model.destroy();
		this.$el.remove();
		e.preventDefault();
		}
		
		
	},
	loadDescription: function() {
	    new HotelDetails({model: this.model}).show();
		 var url = event.target.pathname;
         Backbone.history.navigate(url, { trigger: true });
	}
});

/*
 * Hotel list/collection view
 */
HotelList = Backbone.View.extend({
	initialize: function() {
		_(this).bindAll('add');

		this._hotels = [];
		
		this.collection.each(this.add);
		
		this.collection.bind('add', this.add);
	},
	render: function() {
		this._rendered = true;
		this.$el.empty();
		_(this._hotels).each(function(item) {
			$hotels.append(item.render().el);
		});
	},
	add: function(hotel) {
		var hotelItem = new HotelItem({model: hotel});

		this._hotels.push(hotelItem);

		if (this._rendered) {
			this.$el.append(hotelItem.render().el);
		}
	}
});

/*
 * Modal dialog/form for creating or editing single hotel
 */
HotelDialog = Backbone.View.extend({
	events: {
		'click .save-action': 'save',
		'click .close,.close-action': 'close'
	},
	initialize: function() {
		this.template = _.template($('#hotel-dialog').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	show: function() {
		$(document.body).append(this.render().el);
	},
	close: function() {
		this.remove();
	},
	
	save: function() {
		var that = this;
		$.each(this.$el.find('input'), function(i, item) {
			var attribute = {};
			attribute[item.name] = item.value;
			that.model.set(attribute);
		});

		if (null == this.model.id) {
			this.model.set({city_id: currentCityId});
			hotels.create(this.model);
		} else {
			this.model.save();
		}
		this.remove();
	}
});


/*
 * View Modal dialog to reserve Hotel
 */
HotelDetails = Backbone.View.extend({
    events: {
		'click .close,.close-action': 'close',
		'click .delete-action': 'delete'
	},
	initialize: function() {
		this.template = _.template($('#hotel-reserve').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	show: function() {
		$(document.body).append(this.render().el);
	},
	close: function() {
		this.remove();
	},
	delete: function (e) {
		this.model.destroy();
		this.$el.remove();
		e.preventDefault();
		
	}
});

/*
 *  
 */
citys = new CityCollection();
citys.fetch({success: function() {
	cityListView = new CityList({
		collection: citys,
		el: $citys
	});
	cityListView.render();
	$citys.find('li:nth-child(2)').find('a').trigger('click');
}});

/*
 * button add city
 */
$('#add-city').click(function(e) {
	var view = new CityDialog({model: new City()});
	view.show();
	return false;
});

/*
 * button remove city
 */
$('#remove-city').click(function(e) {
	citys.get(currentCityId).destroy();
	return false;	
});

/*
 * button add hotel
 */
$('#add-hotel').click(function(e) {
	var view = new HotelDialog({model: new Hotel()});
	view.show();
	return false;
});

