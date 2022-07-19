# yah-node-sdk

Yah Node.js SDK - includes libraries for SHIELD services and Function Blocks Configurations

## SDK Usage

1. To write a function,

```
npm install yah-node-sdk -s
```

Run Handler / Function using run method by importing functions sdk from yah-node-sdk.

```
import { functions } from "yah-node-sdk";

export block_name = (req, res) => {

// business logic
}

functions.run(block_name)
```

2. SHIELD

```
npm install yah-node-sdk
```

`Before using shield, app need to be initialized.`

Initialze the application using internals SDK

```
import { internals } from "yah-node-sdk";

internals.initialize({
		clientId:     process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	})
```

Using the methods from shield sdk

```
import { shield } from "yah-node-sdk";

const SheildExampleHandler = async (req, res, next) => {
  try {
  
    // Get user details using shield
    const userDetails = await shield.getUser(req);

    // Get user uid using shield
    const userUID = await shield.getUID(req);

  } catch (error) {
    // handle the error
  }
};
```

Run SheildExampleHandler using run method from funciton sdk.

```
import { functions } from "yah-node-sdk";

functions.run(SheildExampleHandler)
```

To run a function, There is 2 option

1. Using CLI

```
yah start block_name
```
to start an individual block.

or

```
yah start
```

to start them all.


2. Assigning a port manually using flags.

```
cd ./examples/functions-example/
node index.js --port=3000 
```

the above command will run function in port 3000

go to github.com/Yahilo/yah-node-sdk/tree/main/examples/shield-example to see more example.

Read Docs for advanced tooling
