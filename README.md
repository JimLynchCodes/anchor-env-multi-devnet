# anchor-env-multi-devnet

This project is an example of holding two different key pairs in an Anchor project and deploy different versions of the same program (e.g., "staging" and "prod") to devnet with different program IDs. The steps to achieve this involve configuring the project to support multiple deployments and ensuring that you can manage separate program IDs for each environment.

<br/>

# Steps to prepare the project for different program IDs


## Create Separate Key Pairs for Staging and Production

You need two different key pairs for the two environments. You can generate key pairs using the Solana CLI:

```
solana-keygen new --outfile ~/devnet-staging-keypair.json
solana-keygen new --outfile ~/devnet-prod-keypair.json
```

Check the public key of a given keypair like this:
```
solana-keygen pubkey ~/devnet-staging-keypair.json
solana-keygen pubkey ~/devnet-prod-keypair.json
```

Here's how to modify your Anchor.toml:

Anchor.toml
```
[programs.devnet]
staging = "staging_program_id"

[programs.devnet]
prod = "prod_program_id"
```


Update the program id in the code to work with both deployment targets:

lib.rs
```
#[cfg(feature = "staging")]
pub const PROGRAM_ID: &str = "staging_program_id";

#[cfg(feature = "prod")]
pub const PROGRAM_ID: &str = "prod_program_id";

// Example usage of PROGRAM_ID
pub fn get_program_id() -> &'static str {
    PROGRAM_ID
}
```


Then be sure to build it with the --features flag:
```
anchor build --features staging
```

When deploying, specify the keypair with the program id flag.
```
solana program deploy --program-id ~/path-to-your-keypair.json your_program.so
```

Check that it was deployed properly:
```
solana program show <program_id>
```



## Multi-deployment setup

1) Show public key of keypair created by anchor init

```
solana-keygen pubkey ./target/deploy/my_project-keypair.json 
```

In this case, 7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx

Then create a second key:
```
solana-keygen new --outfile ./target/deploy/staging-keypair.json
```

Take note of the public key printed, save the seed phrase, and notice how running the "pubkey" command on this one prints the same key.

In this case, G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb


Then, 

1) Update lib.rs

```
// "first key (my_project-keypair.json)"
declare_id!("7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx");

// "second key (my_project-keypair.json)"
// declare_id!("G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb");
```

2) Update Anchor.toml

```
[programs.localnet]
my_project = "7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx"
# my_project = "G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb"

[programs.devnet]
my_project = "7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx"
# my_project = "G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb"
```

3) Then build and deploy to first _"environment"_

```
anchor build 
```

specify key and program name when deploying:
```
anchor deploy --provider.cluster devnet --program-keypair ./target/deploy/my_project-keypair.json --program-name my_project
```

This deploys the smart contract at 7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx


Don't forget to deploy the idl also!
```
anchor idl init --provider.cluster devnet  --filepath ./target/idl/my_project.json 7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx
```

And upgrading later:
```
anchor idl upgrade --provider.cluster devnet --filepath ./target/idl/my_project.json 7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx
```

---

## Deploy to _Other_ Environment (Eg. Devnet Staging)

1) Check the pub key again for the other keypair
```
solana-keygen pubkey ./target/deploy/my_project-keypair.json
```

2) Update lib.rs to declare the other key

3) Update Anchor.toml to set the other pubkey

4) Then make a new build

```
anchor build
```

5) deploy
```
anchor deploy --provider.cluster devnet --program-keypair ./target/deploy/staging-keypair.json --program-name my_project
```

6) and deploy idl

first time
```
anchor idl init --provider.cluster devnet --filepath ./target/idl/my_project.json G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb
```

updating later
```
anchor idl upgrade --provider.cluster devnet --filepath ./target/idl/my_project.json G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb
```