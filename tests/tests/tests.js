var expect = chai.expect;
describe('Hotel', function() {
   

    describe('constructor', function() {
        it('should have a name', function() {
            var hotel = new Hotel('hotel','aaa','bbb' );
            expect(hotel.name).to.equal('hotel');
        });

        it('should have an address', function() {
        var hotel = new Hotel('hotel','aaa','bbb');
        chai.assert.equal(hotel.address, 'aaa');
       });
	   
	   it('should have a description', function() {
        var hotel = new Hotel('hotel','aaa','bbb');
        chai.assert.equal(hotel.description, 'bbb');
       });
	   
    });

    
   
});
