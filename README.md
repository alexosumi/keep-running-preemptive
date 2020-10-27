# keep-running-preemptive
This project was made to start a TERMINATED preemptive compute instance on Google Cloud Platform.


# INSTALL
1) To run this project at the first you need create an serviceaccount, follow the official doc from GCP to create a serviceaccount:
https://cloud.google.com/iam/docs/creating-managing-service-accounts

prefer to create a brand new and dedicated role with follow permissions(for security purposes):
    - compute.instances.get
    - compute.instances.list
    - compute.instances.start
    - compute.instances.stop
    - compute.zoneOperations.get
    - compute.zones.list

2) After create serviceassount you need to generate a KEY, follow the doc to create a key:
https://cloud.google.com/iam/docs/creating-managing-service-account-keys

