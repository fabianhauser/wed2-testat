/**
 * Created by michi on 14.10.16.
 */

function configurator(req, res) {

  if(req.cookies.configuration) {
    var configuration = JSON.parse(req.cookies.configuration);
  } else {
    var configuration = {
      layout: '',
      notes: {
      orderBy: 'createdAt',
        filterBy: '',
      }
    };
  }

  if(req.query.layout){
    configuration.layout = req.query.layout;
  }

  if(req.query.orderBy !== undefined){
    configuration.notes.orderBy = req.query.orderBy;
  }

  if(req.query.filterBy !== undefined){
    configuration.notes.filterBy = req.query.filterBy;
  }

  var confStringify = JSON.stringify(configuration);
  if(req.cookie === undefined) req.cookie = {};
  req.cookie.configuration = confStringify;
  res.cookie('configuration', confStringify, { maxAge: 900000, httpOnly: true });
  return configuration;
}

module.exports = configurator;
