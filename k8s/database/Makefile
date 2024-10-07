deploy-pv:
	kubectl apply -f postgres-pv.yaml

deploy-pvc:
	kubectl apply -f postgres-pvc.yaml

deploy-deployment:
	kubectl apply -f deployment.yaml

deploy-service:
	kubectl apply -f service.yaml

deploy:
	make deploy-pv
	make deploy-pvc
	make deploy-deployment
	make deploy-service
