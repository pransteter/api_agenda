# API Agenda

### Como inicio o projeto?

# Rode o seguinte comando:

`make build && make up`

> obs.: Você vai precisar de docker + docker-compose instalados.

# Aguarde. Quando visualizar a mensagem abaixo, o serviço estará disponível:

`"api_agenda_app         | Api disponível no endereço: http://localhost:4001"`

# Verifique se a API está disponível através do seguinte comando:

`curl localhost:4001/health`

> obs.: Você vai precisar do app curl instalado.

### Rodando os testes:

`make tests`