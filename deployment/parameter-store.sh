#!/usr/bin/env bash
# Put parameters into Parameter Store
aws ssm put-parameter \
  --name /sample/db_name \
  --type String \
  --value "sample" \
  --description "sample database name" \
  --overwrite

aws ssm put-parameter \
  --name /sample/master_username \
  --type String \
  --value "master" \
  --description "Master Username for database" \
  --overwrite

aws ssm put-parameter \
  --name /sample/master_password \
  --type SecureString \
  --value "your-password-will-go-here" \
  --description "Master Password for database" \
  --overwrite

aws ssm put-parameter \
  --name /sample/alert_phone \
  --type String \
  --value "+91-number" \
  --description "RDS alert SMS phone number" \
  --overwrite

# Get parameters from Parameter Store
aws ssm get-parameter \
  --name /sample/db_name \
  #--query Parameter.Value

aws ssm get-parameter \
  --name /sample/master_username \
  #--query Parameter.Value

aws ssm get-parameter \
  --with-decryption \
  --name /sample/master_password \
  #--query Parameter.Value

aws ssm get-parameter \
  --name /sample/alert_phone \
  #--query Parameter.Name
