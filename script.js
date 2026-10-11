// Base de dados simulada de Médicos e Horários
const especialistas = [
    { id: 1, nome: "Dra. Ana Mendes", especialidade: "Cardiologia", icone: "👩‍⚕️" },
    { id: 2, nome: "Dr. Carlos Silva", especialidade: "Dermatologia", icone: "👨‍⚕️" },
    { id: 3, nome: "Dra. Julia Costa", especialidade: "Nutrição", icone: "🍏" }
];

const horariosDisponiveis = ["08:00", "09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

// Estado da Aplicação
let agendamento = { medico: null, horario: null, paciente: null, plano: null };

// 1. Inicializar Especialistas
function carregarEspecialistas() {
    const lista = document.getElementById('lista-especialistas');
    especialistas.forEach(esp => {
        const btn = document.createElement('button');
        btn.className = 'card-especialista';
        btn.innerHTML = `
            <span class="avatar">${esp.icone}</span>
            <span class="nome-esp">${esp.nome}</span>
            <span class="area-esp">${esp.especialidade}</span>
        `;
        btn.onclick = () => selecionarMedico(esp);
        lista.appendChild(btn);
    });
}

function selecionarMedico(medico) {
    agendamento.medico = medico;
    document.getElementById('passo-1').classList.add('escondido');
    document.getElementById('passo-2').classList.remove('escondido');
    document.getElementById('nome-medico-selecionado').textContent = `Agendando com: ${medico.nome} (${medico.especialidade})`;
    carregarHorarios();
}

function carregarHorarios() {
    const lista = document.getElementById('lista-horarios');
    lista.innerHTML = '';
    horariosDisponiveis.forEach(hora => {
        const btn = document.createElement('button');
        btn.className = 'horario-btn';
        btn.textContent = hora;
        btn.onclick = () => selecionarHorario(hora);
        lista.appendChild(btn);
    });
}

function selecionarHorario(hora) {
    agendamento.horario = hora;
    document.getElementById('passo-2').classList.add('escondido');
    document.getElementById('passo-3').classList.remove('escondido');
    
    document.getElementById('resumo-escolha').innerHTML = `
        <strong>Resumo:</strong> Consulta de ${agendamento.medico.especialidade} com 
        ${agendamento.medico.nome} às <strong>${agendamento.horario}</strong>.
    `;
}

function voltarPasso(passo) {
    if (passo === 1) {
        document.getElementById('passo-2').classList.add('escondido');
        document.getElementById('passo-1').classList.remove('escondido');
    } else if (passo === 2) {
        document.getElementById('passo-3').classList.add('escondido');
        document.getElementById('passo-2').classList.remove('escondido');
    }
}

// Lógica de Submissão e Simulação de Automação
function finalizarAgendamento(event) {
    event.preventDefault(); // Evita recarregar a página
    
    agendamento.paciente = document.getElementById('paciente-nome').value;
    agendamento.plano = document.getElementById('paciente-plano').value;

    // Mostra o Modal de Sucesso
    document.getElementById('modal-sucesso').classList.remove('escondido');

    // Simulação do sistema de automação (Backend / Webhooks)
    const recElemento = document.getElementById('auto-recepcao');
    const medElemento = document.getElementById('auto-medico');

    // 1. Simula notificação para a receção (Aprovações/Documentos) após 1.5s
    setTimeout(() => {
        recElemento.innerHTML = `✅ <strong>Receção notificada:</strong> Provisionando documentos para plano: <em>${agendamento.plano}</em> do paciente ${agendamento.paciente}.`;
        recElemento.classList.add('auto-ok');
    }, 1500);

    // 2. Simula notificação para o Médico (Agenda Sincronizada) após 3s
    setTimeout(() => {
        medElemento.innerHTML = `✅ <strong>Dr(a). notificado(a):</strong> Horário das ${agendamento.horario} bloqueado e visível na agenda do(a) ${agendamento.medico.nome}.`;
        medElemento.classList.add('auto-ok');
    }, 3000);
}

// Iniciar a aplicação
carregarEspecialistas();
