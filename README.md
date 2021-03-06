# keep-running-preemptive <img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" width="50">
This project was made to start a TERMINATED preemptive compute instance on Google Cloud Platform.

## Purpose
the goal of creating this project is that i need to have a good amount of gitlab-runners and the intance group didn’t suit me because it used a load balancer and the name of the machines and fingerprint change dynamically, so I decided to create an application that is monitoring the status of N compute engine and if any of them stay in a TERMINATED state the keep-running-preemptive will start this machine, and by using preemptive instances for workload that do not need 100% availability, we will save 80% in this group of machines.



### INSTALL (Local Machine or VM)
**1** - Create a custom and dedicated role with follow permissions(for security purposes):
 - compute.instances.get
 - compute.instances.list
 - compute.instances.start
 - compute.zoneOperations.get
 - compute.zones.list


**2** - Create an serviceaccount, follow the official doc from GCP to create a serviceaccount:
https://cloud.google.com/iam/docs/creating-managing-service-accounts


**3** - After create serviceassount you need to generate a KEY, follow the doc to create a key:
https://cloud.google.com/iam/docs/creating-managing-service-account-keys


**4** - Download serviceaccount JSON and move it to project folder with name credentials.json(or change name in .env file)


**5** - Create your .env file based on .env.example:
```sh
$ cp -a .env.example .env
```


**6** - .env explanation:
 - GOOGLE_APPLICATION_CREDENTIALS # credential name of serviceaccount (step 2)
 - COMPUTE_ENGINE # name of compute engine what need to be started, can be one compute engine or many
 - SLEEP_TIME_MS # check interval in milliseconds(1000 milliseconds = 1 second), default value is 300000(5 minutes)


**7** - Install dependencies: 
```sh
$ npm install
```

**8** - Run keep-running-preemptive:
```sh
$ npm start
```


### DOCKER
**1** - Follow steps 1 ~ 6 from INSTALL session


**2** - Build docker image:
```sh
$ docker build . -t brandnew_keep-running-preemptive_image
```
**3** - Run:
```sh
$ docker run brandnew_keep-running-preemptive_image
```
**note**: The Dockerfile in this project copy all files to docker image, fill free to change it as you need.


### KUBERNETES

**1** - Follow steps 1 ~ 2


**2** - Edit kubernetes/deploy.yaml to change docker image to yours


**3** - Create Deployment resource:
```sh
$ kubectl create -f kubernetes/deploy.yaml -n yourNamespace
```