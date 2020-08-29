import { MD<%=parentName%>, MC<%=parentName%> } from 'models/MD<%=parentName%>';

const MD<%=filename%> = MD<%=parentName%>.extend({
  defaults: {},
  validators: {
    group1: {

    }
  },

});

const MC<%=filename%> = MC<%=parentName%>.extend({
  model: MD<%=filename%>,
});

export { MD<%=filename%>, MC<%=filename%> };
