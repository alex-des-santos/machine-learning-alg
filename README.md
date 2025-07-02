# 🤖 Machine Learning Algoritmos - Guia Visual Interativo

Uma página web educativa e interativa que explica os algoritmos de machine learning mais populares com visualizações dinâmicas e exemplos práticos.

## 🚀 Demo Online

Esta página pode ser visualizada diretamente no GitHub Pages: [Clique aqui para ver a demo](https://seuusername.github.io/machine-learning-alg)

## 📚 Algoritmos Incluídos

### 1. **📈 Regressão Linear**
- **Tipo**: Supervisionado - Regressão
- **Exemplo**: Predição de preços de casas com base no tamanho
- **Visualização**: Gráfico de dispersão com linha de tendência
- **Quando usar**: Relações lineares, valores numéricos

### 2. **📊 Regressão Logística**
- **Tipo**: Supervisionado - Classificação
- **Exemplo**: Detecção de spam em emails
- **Visualização**: Curva sigmóide com pontos de classificação
- **Quando usar**: Classificação binária, probabilidades

### 3. **🌳 Árvore de Decisão**
- **Tipo**: Supervisionado - Classificação/Regressão
- **Exemplo**: Aprovação de empréstimos bancários
- **Visualização**: Fluxograma de decisões
- **Quando usar**: Regras de negócio claras, interpretabilidade

### 4. **🎯 K-Means**
- **Tipo**: Não-supervisionado - Agrupamento
- **Exemplo**: Segmentação de clientes
- **Visualização**: Clusters coloridos com centroids
- **Quando usar**: Descobrir padrões, segmentação

### 5. **🧠 Rede Neural**
- **Tipo**: Supervisionado - Classificação/Regressão
- **Exemplo**: Reconhecimento de imagens (gato vs cachorro)
- **Visualização**: Diagrama de rede com animação
- **Quando usar**: Problemas complexos, grandes datasets

### 6. **🌲 Random Forest**
- **Tipo**: Supervisionado - Classificação/Regressão
- **Exemplo**: Diagnóstico médico por votação
- **Visualização**: Múltiplas árvores com votação final
- **Quando usar**: Alta precisão, dados ruidosos

## 🛠️ Funcionalidades

- **Visualizações Interativas**: Gráficos que podem ser regenerados com novos dados
- **Explicações Simples**: Linguagem acessível para iniciantes
- **Exemplos Práticos**: Casos de uso do mundo real
- **Design Responsivo**: Funciona em desktop e mobile
- **Comparação de Algoritmos**: Tabela comparativa com métricas
- **Recursos Adicionais**: Links para ferramentas e cursos

## 🌐 Como Hospedar no GitHub Pages

### Passo 1: Criar Repositório
1. Vá para [GitHub.com](https://github.com)
2. Clique em "New repository"
3. Nome: `machine-learning-alg`
4. Marque "Public"
5. Marque "Add a README file"
6. Clique "Create repository"

### Passo 2: Upload dos Arquivos
1. No repositório criado, clique em "uploading an existing file"
2. Arraste os arquivos:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Commit as mudanças

### Passo 3: Ativar GitHub Pages
1. Vá para "Settings" do repositório
2. Role até "Pages" na barra lateral
3. Em "Source", selecione "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"
6. Clique "Save"

### Passo 4: Acessar a Página
- Em poucos minutos, sua página estará disponível em:
- `https://seuusername.github.io/machine-learning-alg`

## 💻 Como Executar Localmente

1. **Clone ou baixe os arquivos**
2. **Abra index.html** em qualquer navegador moderno
3. **Ou use um servidor local** (recomendado):
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve .
   
   # Com PHP
   php -S localhost:8000
   ```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com Grid e Flexbox
- **JavaScript**: Interatividade e visualizações
- **Chart.js**: Gráficos interativos
- **D3.js**: Visualizações customizadas
- **Design Responsivo**: Mobile-first approach

## 📱 Compatibilidade

- ✅ Chrome (70+)
- ✅ Firefox (65+)
- ✅ Safari (12+)
- ✅ Edge (79+)
- ✅ Mobile browsers

## 🎯 Público Alvo

- **Iniciantes** em Machine Learning
- **Estudantes** de Ciência de Dados
- **Desenvolvedores** buscando conceitos visuais
- **Educadores** ensinando ML
- **Curiosos** sobre inteligência artificial

## 🔧 Personalização

### Adicionar Novo Algoritmo
1. Adicione uma nova `.algorithm-card` no HTML
2. Crie a função de visualização no JavaScript
3. Adicione estilos específicos no CSS

### Modificar Cores
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

### Adicionar Idiomas
- Traduza os textos no HTML
- Mantenha as classes CSS inalteradas
- Atualize o `lang` attribute

## 📊 Métricas de Aprendizado

O site inclui uma tabela comparativa mostrando:
- Facilidade de interpretação (⭐⭐⭐⭐⭐)
- Velocidade de processamento
- Precisão esperada
- Casos de uso ideais

## 🎓 Recursos de Aprendizado

### Ferramentas Interativas
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [TensorFlow Playground](https://playground.tensorflow.org/)
- [Kaggle Learn](https://www.kaggle.com/learn)

### Datasets para Praticar
- [UCI ML Repository](https://archive.ics.uci.edu/ml/)
- [Kaggle Datasets](https://www.kaggle.com/datasets)
- [Google Dataset Search](https://datasetsearch.research.google.com/)

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

### Ideias para Contribuições
- [ ] Adicionar mais algoritmos (SVM, KNN, etc.)
- [ ] Implementar modo escuro
- [ ] Adicionar animações mais sofisticadas
- [ ] Traduzir para outros idiomas
- [ ] Melhorar acessibilidade
- [ ] Adicionar testes interativos/quizzes

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Chart.js pela biblioteca de gráficos
- D3.js pelas visualizações avançadas
- Comunidade de Machine Learning pelas inspirações
- GitHub Pages pela hospedagem gratuita

---

**Feito com ❤️ para democratizar o aprendizado de Machine Learning**

*Se este projeto te ajudou, considere dar uma ⭐ no repositório!*
