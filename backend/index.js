var addon = require("neon-bridge").load({root: './backend'});

console.log(addon.hello());
