deploy-deployment:
	kubectl apply -f deployment.yaml

deploy-service:
	kubectl apply -f service.yaml

deploy-hpa:
	kubectl apply -f autoscaling.yaml

deploy:
	make deploy-deployment
	make deploy-service
	make deploy-hpa
