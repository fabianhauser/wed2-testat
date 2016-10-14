/**
 * Created by michi on 14.10.16.
 */

function configurator(req, res) {

  if(req.cookies.configuration) {
    var configuration = JSON.parse(req.cookies.configuration);
  } else {
    var configuration = {
      notes: {
        orderBy: 'createdAt',
        filterBy: ''
      }
    };
  }

  if(req.params.orderBy){
    configuration.notes.orderBy = req.params.orderBy;
  }

  if(req.params.filterBy){
    configuration.notes.filterBy = req.params.orderBy;
  }

  var confStringify = JSON.stringify(configuration);
  if(req.cookie === undefined) req.cookie = {};
  req.cookie.configuration = confStringify;
  res.cookie('configuration', confStringify, { maxAge: 900000, httpOnly: true });
  return configuration;
}

module.exports = configurator;
