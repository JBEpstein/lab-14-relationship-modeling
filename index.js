'use strict';
require("dotenv").config();

require(__dirname + '/lib/server').listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port: ${process.env.PORT || 3000}`);
    
});
