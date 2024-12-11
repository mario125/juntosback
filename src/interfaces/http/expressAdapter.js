
class ExpressAdapter {
    static adapt(controllerMethod) {
      return async (req, res, next) => {
        try {
      
          await controllerMethod(req, res);
        } catch (error) {
        
          console.error('Error in ExpressAdapter:', error.message);
          res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
      };
    }
  }
  
  module.exports = ExpressAdapter;
  