include backend/Makefile
include database/Makefile
include common/Makefile

backend-apply:
  cd backend && make deploy-backend

database-apply:
  cd database && make deploy-database

common-apply:
  cd common && make deploy-common

deploy-fastfood:
  make common-apply
  make database-apply
  make backend-apply
