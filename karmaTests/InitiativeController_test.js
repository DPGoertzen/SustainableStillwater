//test-test to ensure Karma functionality
describe('testing the initiative array', function(){
  beforeEach(module('ssmnApp'));

  describe('The pillars', function(){
    it('should be equal to [1,2,3]', inject(function($controller){
      var InitiativeController = $controller('InitiativeController');

      expect(InitiativeController.pillars).to.deep.equal([1,2,3])
    }))
  })
})
