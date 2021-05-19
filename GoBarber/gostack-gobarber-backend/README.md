# Recuperação de senha
**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envio em produção;
- O envio de e-mails deve acontecer em segundo plano (background job)(Fila);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar sua senha

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando o Socket.io

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu perfil nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar a sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento dee durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar um horário consigo mesmo;
