export const seniorityOptions = [
  { value: "any", label: "Qualquer uma" },
  { value: "estagio", label: "Estágio" },
  { value: "assistente", label: "Assistente" },
  { value: "junior", label: "Júnior" },
  { value: "pleno", label: "Pleno" },
  { value: "senior", label: "Sênior" },
  { value: "diretor", label: "Diretor" },
  { value: "executivo", label: "Executivo" },
]

export const linkedinTimePostedOptions = [
  { value: "any", label: "A qualquer momento" },
  { value: "r3600", label: "Última hora" },
  { value: "r86400", label: "Últimas 24 horas" },
  { value: "r604800", label: "Última semana" },
  { value: "r2592000", label: "Último mês" },
]

export const indeedTimePostedOptions = [
  { value: "any", label: "A qualquer momento" },
  { value: "1", label: "Últimas 24 horas" },
  { value: "3", label: "Últimos 3 dias" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "14", label: "Últimos 14 dias" },
]

export const workModelOptions = [
  { value: "any", label: "Qualquer modelo" },
  { value: "presencial", label: "Apenas Presencial" },
  { value: "remoto", label: "Apenas Remoto" },
  { value: "hibrido", label: "Híbrido" },
]

export const searchModeOptions = [
  { value: "preciso", label: "Preciso (Recomendado)" },
  { value: "poderoso", label: "Poderoso (Experimental)" },
]

export const linkedinSeniorityMap = {
  estagio: "1", // Internship
  assistente: "2", // Entry level
  junior: "3", // Associate
  pleno: "4", // Mid-Senior level
  senior: "4", // Mid-Senior level (LinkedIn agrupa Pleno e Sênior sob o mesmo código)
  diretor: "5", // Director
  executivo: "6", // Executive
}

export const linkedinWorkModelMap = {
  presencial: "1",
  remoto: "2",
  hibrido: "3",
}

export const linkedinExclusions = {
  estagio: [
    "Assistente",
    "Júnior",
    "Junior",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  assistente: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Júnior",
    "Junior",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  junior: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Assistente",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  pleno: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Assistente",
    "Júnior",
    "Junior",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  senior: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Assistente",
    "Júnior",
    "Junior",
    "Pleno",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  diretor: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Assistente",
    "Júnior",
    "Junior",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
  ],
  executivo: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Assistente",
    "Júnior",
    "Junior",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
    "Coordenador",
    "Gerente",
  ],
}

export const indeedExclusions = {
  estagio: [
    "Júnior",
    "Junior",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  junior: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Pleno",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  pleno: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Júnior",
    "Junior",
    "Sênior",
    "Senior",
    "Especialista",
    "Executivo",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  senior: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Júnior",
    "Junior",
    "Pleno",
    "Coordenador",
    "Gerente",
    "Diretor",
  ],
  especialista: [
    "Estágio",
    "Estagio",
    "Trainee",
    "Júnior",
    "Junior",
    "Pleno",
  ],
} 