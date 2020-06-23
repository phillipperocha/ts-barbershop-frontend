import React from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  // O Content será exibido o conteúdo abaixo do Header
  // O Schedule sao os agendamentos a esquerda
  // E o calendar é o pequeno calendário a direita que será feito a posteriori
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="BarberShop" />

          <Profile>
            <img
              src="https://avatars2.githubusercontent.com/u/32747713?s=460&u=cf48f7d4525ec7fece84e3251c5837d45bc81115&v=4"
              alt={user.name}
            />

            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/32747713?s=460&u=cf48f7d4525ec7fece84e3251c5837d45bc81115&v=4"
                alt={user.name}
              />

              <strong>{user.name}</strong>
              <span>
                <FiClock />
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
