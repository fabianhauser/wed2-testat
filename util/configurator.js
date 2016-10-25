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
        filterBy: '',
        orderBy: 'createdAt',
        sorting: 1
      }
    };
  }

  if(req.query.layout !== undefined){
      configuration.layout = req.query.layout;
  }

  if(req.query.orderBy !== undefined){
    configuration.notes.orderBy = req.query.orderBy;

    // 1 = ascending, -1 = descending
    if (configuration.notes.sorting === 1) {
      configuration.notes.sorting = -1;
    } else {
      configuration.notes.sorting = 1;
    }
  }

  if(req.query.filterBy !== undefined){
    configuration.notes.filterBy = req.query.filterBy;
  }

  var confStringify = JSON.stringify(configuration);
  if(req.cookie === undefined) {
    req.cookie = {};
  }
  req.cookie.configuration = confStringify;
  res.cookie('configuration', confStringify, { maxAge: 900000, httpOnly: true });
  return configuration;
}

module.exports = configurator;
