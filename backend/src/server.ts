import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import bcrypt from 'bcryptjs';
import { authRoutes } from './routes/auth.routes';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import { userRoutes } from './routes/user.routes';
import {universityRoutes} from './routes/university.routes';
import { postRoutes } from './routes/post.routes';
import {comentarioRoutes} from './routes/comment.routes';
import { curtidaRoutes } from './routes/like.routes';
import { grupoApoioRoutes } from './routes/grupoApoio.routes';
import { participacaoGrupoRoutes } from './routes/groupParticipation.routes';
import { recursoRoutes } from './routes/resource.routes';
import { acessoRecursoRoutes } from './routes/resourceAccess.routes';
import { contatoEmergenciaRoutes } from './routes/contactEmergency.routes';
import { alertaEmergenciaRoutes } from './routes/alertEmergency.routes';
import { contatoConfiancaRoutes } from './routes/contactTrust.routes';
import { userSearchRoutes } from './routes/userSearchRoutes.routes';
import { redeApoioRoutes } from './routes/redeApoioRoutes.routes';


//teste github

const app = Fastify({ logger: true });

// Registra o CORS antes dos demais plugins/rotas
app.register(cors, {
  origin: true, // ou use '*' para liberar todas as origens (não recomendado para produção)
  credentials: true, // Permite o envio/recebimento de cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});


app.register(fastifyCookie);



app.register(fastifyJwt, {
  secret: 'super_secret_key',
  cookie: {
    cookieName: 'token', 
    signed: false
  }
});


app.register(authRoutes);


app.addHook('preHandler', async (request, reply) => {
  
  if (request.routeOptions?.url === '/login') {
    return;
  }

  
  try {
    const token = request.cookies.token; 
    if (!token) {
      throw new Error('Token não fornecido');
    }

    await request.jwtVerify(); 

  } catch (err) {
    return reply.code(401).send({ message: 'Token inválido ou não fornecido' });
  }
});



app.register(userRoutes, {
  prefix: '/users',
});

app.register(universityRoutes, { 
  prefix: '/university' });

app.register(postRoutes, {
  prefix: '/posts',
});

app.register(curtidaRoutes, { 
  prefix: '/curtidas' 
});

app.register(comentarioRoutes, { prefix: '/comentarios' });

app.register(grupoApoioRoutes, {
  prefix: '/grupos-apoio'
});

app.register(participacaoGrupoRoutes, { prefix: '/participacao-grupo' });

app.register(recursoRoutes, {
  prefix: '/recursos'
})

app.register(acessoRecursoRoutes, { prefix: '/acessos-recursos' });

app.register(contatoEmergenciaRoutes, { prefix: '/contatos-emergencia' });

app.register(contatoConfiancaRoutes, { prefix: '/contatos-confianca' });

app.register(alertaEmergenciaRoutes, { prefix: '/alertas-emergencia' });

app.register(userSearchRoutes, { prefix: '/usuarios' });
app.register(redeApoioRoutes, { prefix: '/rede-apoio' });

app.listen({ port: 3100, host: '0.0.0.0' })
  .then(() => console.log('Server listening on port 3100'))
  .catch(err => {
    console.error('Erro ao subir servidor:', err);
    process.exit(1);
  });



