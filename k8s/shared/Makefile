deploy-config:
	kubectl apply -f configmap.yaml

deploy-secrets:
	kubectl apply -f secrets.yaml

deploy-metrics:
	kubectl apply -f metrics-server-components.yaml

deploy:
	make deploy-config
	make deploy-secrets
	make deploy-metrics
