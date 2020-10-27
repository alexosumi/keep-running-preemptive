# keep-running-preemptive
This project was made to start a TERMINATED preemptive compute instance on Google Cloud Platform.


## INSTALL
**1)** create an serviceaccount, follow the official doc from GCP to create a serviceaccount:
https://cloud.google.com/iam/docs/creating-managing-service-accounts

prefer to create a brand new and dedicated role with follow permissions(for security purposes):
 - compute.instances.get
 - compute.instances.list
 - compute.instances.start
 - compute.instances.stop
 - compute.zoneOperations.get
 - compute.zones.list

**2)** After create serviceassount you need to generate a KEY, follow the doc to create a key:
https://cloud.google.com/iam/docs/creating-managing-service-account-keys

**3)** Download serviceaccount JSON and move it to project folder with name credentials.json(or change name in .env file)

**4)** create your .env file based on .env.example:
```sh
$ cp -a .env.example .env
```

**5)** .env explanation:
 - **GOOGLE_APPLICATION_CREDENTIALS** # credential name of serviceaccount (step 2)
 - **COMPUTE_ENGINE** # name of compute engine what need to be started, can be one compute engine or many
 - **SLEEP_TIME_MS** # check interval in milliseconds(1000 milliseconds = 1 second), default value is 300000(5 minutes)

**6)** install dependencies: 
```sh
$ npm install
```
