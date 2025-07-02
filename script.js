// Dados globais para os algoritmos
let linearRegressionChart, logisticRegressionChart, kmeansChart;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    generateDecisionTree();
    generateNeuralNetwork();
    generateRandomForest();
    generateGradientBoosting();
});

// Smooth scrolling para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==================== LINEAR REGRESSION ====================
function initializeLinearRegression() {
    const ctx = document.getElementById('linearRegressionChart').getContext('2d');
    
    linearRegressionChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Dados (Tamanho da Casa vs Preço)',
                data: [],
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }, {
                label: 'Linha de Regressão',
                data: [],
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Regressão Linear: Preço das Casas'
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tamanho da Casa (m²)'
                    },
                    min: 0,
                    max: 200
                },
                y: {
                    title: {
                        display: true,
                        text: 'Preço (R$ milhares)'
                    },
                    min: 0,
                    max: 1000
                }
            }
        }
    });
    
    generateLinearRegressionData();
}

function generateLinearRegressionData() {
    const data = [];
    const n = 30;
    
    // Gerar dados com relação linear + ruído variável
    const trueSlope = 3 + Math.random() * 3; // Slope entre 3-6
    const trueIntercept = 50 + Math.random() * 100; // Intercept entre 50-150
    const noiseLevel = 50 + Math.random() * 100; // Ruído variável
    
    for (let i = 0; i < n; i++) {
        const size = Math.random() * 180 + 20;
        const noise = (Math.random() - 0.5) * noiseLevel;
        const price = trueSlope * size + trueIntercept + noise;
        data.push({x: size, y: Math.max(0, price)}); // Evitar preços negativos
    }
    
    // Calcular REAL regressão linear usando mínimos quadrados
    const {slope, intercept, r2} = calculateLinearRegression(data);
    
    const lineData = [
        {x: 20, y: slope * 20 + intercept},
        {x: 200, y: slope * 200 + intercept}
    ];
    
    // Atualizar título com R²
    linearRegressionChart.options.plugins.title.text = 
        `Regressão Linear: Preço das Casas (R² = ${r2.toFixed(3)})`;
    
    linearRegressionChart.data.datasets[0].data = data;
    linearRegressionChart.data.datasets[1].data = lineData;
    linearRegressionChart.update();
}

function calculateLinearRegression(data) {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumX2 = data.reduce((sum, point) => sum + point.x * point.x, 0);
    const sumY2 = data.reduce((sum, point) => sum + point.y * point.y, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Calcular R²
    const meanY = sumY / n;
    const ssTotal = data.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0);
    const ssRes = data.reduce((sum, point) => {
        const predicted = slope * point.x + intercept;
        return sum + Math.pow(point.y - predicted, 2);
    }, 0);
    const r2 = 1 - (ssRes / ssTotal);
    
    return {slope, intercept, r2: Math.max(0, r2)};
}

// ==================== LOGISTIC REGRESSION ====================
function initializeLogisticRegression() {
    const ctx = document.getElementById('logisticRegressionChart').getContext('2d');
    
    logisticRegressionChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Aprovado (1)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 6
            }, {
                label: 'Negado (0)',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 6
            }, {
                label: 'Curva Logística',
                data: [],
                type: 'line',
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Regressão Logística: Aprovação de Empréstimo'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Score de Crédito'
                    },
                    min: 300,
                    max: 850
                },
                y: {
                    title: {
                        display: true,
                        text: 'Probabilidade de Aprovação'
                    },
                    min: -0.1,
                    max: 1.1
                }
            }
        }
    });
    
    generateLogisticRegressionData();
}

function generateLogisticRegressionData() {
    const approvedData = [];
    const deniedData = [];
    const curveData = [];
    
    // Gerar dados de exemplo
    for (let i = 0; i < 50; i++) {
        const score = Math.random() * 550 + 300; // 300-850
        const probability = 1 / (1 + Math.exp(-(score - 600) / 50)); // Sigmoid
        const approved = Math.random() < probability ? 1 : 0;
        
        if (approved) {
            approvedData.push({x: score, y: 1});
        } else {
            deniedData.push({x: score, y: 0});
        }
    }
    
    // Gerar curva sigmóide
    for (let x = 300; x <= 850; x += 10) {
        const y = 1 / (1 + Math.exp(-(x - 600) / 50));
        curveData.push({x: x, y: y});
    }
    
    logisticRegressionChart.data.datasets[0].data = approvedData;
    logisticRegressionChart.data.datasets[1].data = deniedData;
    logisticRegressionChart.data.datasets[2].data = curveData;
    logisticRegressionChart.update();
}

// ==================== K-MEANS ====================
function initializeKMeans() {
    const ctx = document.getElementById('kmeansChart').getContext('2d');
    
    kmeansChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: []
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'K-Means: Segmentação de Clientes'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Frequência de Compras (por mês)'
                    },
                    min: 0,
                    max: 20
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor Médio Gasto (R$ centenas)'
                    },
                    min: 0,
                    max: 20
                }
            }
        }
    });
    
    generateKMeansData();
}

function generateKMeansData() {
    const numClusters = parseInt(document.getElementById('clustersSlider').value);
    const colors = [
        'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'
    ];
    
    // Gerar dados iniciais aleatórios
    const allPoints = [];
    for (let i = 0; i < 100; i++) {
        allPoints.push({
            x: Math.random() * 18 + 1,
            y: Math.random() * 18 + 1
        });
    }
    
    // Implementar K-Means real (simplificado)
    const {clusters, centroids} = runKMeans(allPoints, numClusters);
    
    const datasets = [];
    for (let i = 0; i < numClusters; i++) {
        // Pontos do cluster
        datasets.push({
            label: `Cluster ${i + 1} (${clusters[i].length} pontos)`,
            data: clusters[i],
            backgroundColor: colors[i],
            borderColor: colors[i].replace('0.6', '1'),
            pointRadius: 4
        });
        
        // Centroide
        datasets.push({
            label: `Centroide ${i + 1}`,
            data: [centroids[i]],
            backgroundColor: 'black',
            borderColor: 'white',
            borderWidth: 2,
            pointRadius: 12,
            pointStyle: 'cross'
        });
    }
    
    kmeansChart.data.datasets = datasets;
    kmeansChart.update();
}

function runKMeans(points, k, maxIterations = 10) {
    // Inicializar centroides aleatórios
    let centroids = [];
    for (let i = 0; i < k; i++) {
        centroids.push({
            x: Math.random() * 18 + 1,
            y: Math.random() * 18 + 1
        });
    }
    
    for (let iter = 0; iter < maxIterations; iter++) {
        // Assignar pontos aos clusters mais próximos
        const clusters = Array(k).fill().map(() => []);
        
        points.forEach(point => {
            let minDistance = Infinity;
            let closestCluster = 0;
            
            centroids.forEach((centroid, i) => {
                const distance = Math.sqrt(
                    Math.pow(point.x - centroid.x, 2) + 
                    Math.pow(point.y - centroid.y, 2)
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCluster = i;
                }
            });
            
            clusters[closestCluster].push(point);
        });
        
        // Recalcular centroides
        const newCentroids = clusters.map(cluster => {
            if (cluster.length === 0) return centroids[clusters.indexOf(cluster)];
            
            const sumX = cluster.reduce((sum, point) => sum + point.x, 0);
            const sumY = cluster.reduce((sum, point) => sum + point.y, 0);
            return {
                x: sumX / cluster.length,
                y: sumY / cluster.length
            };
        });
        
        // Verificar convergência (simplificado)
        const converged = centroids.every((centroid, i) => {
            const dx = Math.abs(centroid.x - newCentroids[i].x);
            const dy = Math.abs(centroid.y - newCentroids[i].y);
            return dx < 0.1 && dy < 0.1;
        });
        
        centroids = newCentroids;
        
        if (converged) break;
    }
    
    // Fazer assignment final
    const finalClusters = Array(k).fill().map(() => []);
    points.forEach(point => {
        let minDistance = Infinity;
        let closestCluster = 0;
        
        centroids.forEach((centroid, i) => {
            const distance = Math.sqrt(
                Math.pow(point.x - centroid.x, 2) + 
                Math.pow(point.y - centroid.y, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                closestCluster = i;
            }
        });
        
        finalClusters[closestCluster].push(point);
    });
    
    return {clusters: finalClusters, centroids};
}

function updateKMeans() {
    generateKMeansData();
}

// ==================== DECISION TREE ====================
function generateDecisionTree() {
    const container = document.getElementById('decisionTreeViz');
    
    // Cenários mais realistas e educativos
    const treeScenarios = [
        {
            title: "Aprovação de Empréstimo Bancário",
            rootQuestion: "Score de Crédito ≥ 700?",
            yesResult: "✅ Pré-aprovado",
            noQuestion: "Renda ≥ 3x Valor?",
            noYesResult: "✅ Análise manual",
            noNoResult: "❌ Negado",
            metrics: { accuracy: "85%", depth: "2", samples: "1.2K" }
        },
        {
            title: "Diagnóstico de Diabetes",
            rootQuestion: "Glicose > 126 mg/dL?",
            yesResult: "⚠️ Suspeita alta",
            noQuestion: "IMC > 30?",
            noYesResult: "⚠️ Risco moderado",
            noNoResult: "✅ Baixo risco",
            metrics: { accuracy: "78%", depth: "3", samples: "2.1K" }
        },
        {
            title: "Detecção de Spam Avançada",
            rootQuestion: "≥3 palavras suspeitas?",
            yesResult: "� Spam provável",
            noQuestion: "Remetente verificado?",
            noYesResult: "✅ Email normal",
            noNoResult: "⚠️ Verificar manualmente",
            metrics: { accuracy: "92%", depth: "4", samples: "50K" }
        }
    ];
    
    const scenario = treeScenarios[Math.floor(Math.random() * treeScenarios.length)];
    
    container.innerHTML = `
        <div class="tree-container">
            <div class="tree-title">${scenario.title}</div>
            <div class="algorithm-metrics">
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="metric-value">${scenario.metrics.accuracy}</div>
                        <div class="metric-label">Precisão</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${scenario.metrics.depth}</div>
                        <div class="metric-label">Profundidade</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${scenario.metrics.samples}</div>
                        <div class="metric-label">Amostras</div>
                    </div>
                </div>
            </div>
            <div class="tree-node">
                <strong>${scenario.rootQuestion}</strong>
            </div>
            <div class="tree-branches">
                <div class="tree-branch-yes">
                    <strong>SIM</strong><br>${scenario.yesResult}
                </div>
                <div class="tree-branch-no">
                    <strong>NÃO</strong><br>⬇️ Continua
                </div>
            </div>
            <div class="tree-node">
                <strong>${scenario.noQuestion}</strong>
            </div>
            <div class="tree-branches">
                <div class="tree-leaf-yes">
                    <strong>SIM</strong><br>${scenario.noYesResult}
                </div>
                <div class="tree-leaf-no">
                    <strong>NÃO</strong><br>${scenario.noNoResult}
                </div>
            </div>
        </div>
    `;
}

// ==================== NEURAL NETWORK ====================
function generateNeuralNetwork() {
    const container = document.getElementById('neuralNetworkViz');
    container.innerHTML = `
        <svg width="380" height="280" style="background: white;">
            <!-- Input Layer -->
            <g id="inputLayer">
                <circle cx="50" cy="70" r="15" fill="#667eea" stroke="#333" stroke-width="2"/>
                <circle cx="50" cy="120" r="15" fill="#667eea" stroke="#333" stroke-width="2"/>
                <circle cx="50" cy="170" r="15" fill="#667eea" stroke="#333" stroke-width="2"/>
                <text x="15" y="75" font-size="10" fill="#333">X1</text>
                <text x="15" y="125" font-size="10" fill="#333">X2</text>
                <text x="15" y="175" font-size="10" fill="#333">X3</text>
            </g>
            
            <!-- Hidden Layer -->
            <g id="hiddenLayer">
                <circle cx="150" cy="50" r="15" fill="#28a745" stroke="#333" stroke-width="2"/>
                <circle cx="150" cy="100" r="15" fill="#28a745" stroke="#333" stroke-width="2"/>
                <circle cx="150" cy="150" r="15" fill="#28a745" stroke="#333" stroke-width="2"/>
                <circle cx="150" cy="200" r="15" fill="#28a745" stroke="#333" stroke-width="2"/>
            </g>
            
            <!-- Output Layer -->
            <g id="outputLayer">
                <circle cx="250" cy="95" r="15" fill="#dc3545" stroke="#333" stroke-width="2"/>
                <circle cx="250" cy="145" r="15" fill="#dc3545" stroke="#333" stroke-width="2"/>
                <text x="270" y="100" font-size="10" fill="#333">Gato</text>
                <text x="270" y="150" font-size="10" fill="#333">Cão</text>
            </g>
            
            <!-- Connections -->
            <g id="connections" stroke="#ccc" stroke-width="1">
                ${generateConnections()}
            </g>
            
            <!-- Labels -->
            <text x="50" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Input</text>
            <text x="150" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Hidden</text>
            <text x="250" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Output</text>
        </svg>
    `;
}

function generateConnections() {
    const inputPositions = [{x: 50, y: 70}, {x: 50, y: 120}, {x: 50, y: 170}];
    const hiddenPositions = [{x: 150, y: 50}, {x: 150, y: 100}, {x: 150, y: 150}, {x: 150, y: 200}];
    const outputPositions = [{x: 250, y: 95}, {x: 250, y: 145}];
    
    let connections = '';
    
    // Input to Hidden
    inputPositions.forEach(input => {
        hiddenPositions.forEach(hidden => {
            connections += `<line x1="${input.x}" y1="${input.y}" x2="${hidden.x}" y2="${hidden.y}"/>`;
        });
    });
    
    // Hidden to Output
    hiddenPositions.forEach(hidden => {
        outputPositions.forEach(output => {
            connections += `<line x1="${hidden.x}" y1="${hidden.y}" x2="${output.x}" y2="${output.y}"/>`;
        });
    });
    
    return connections;
}

function animateNeuralNetwork() {
    const connections = document.querySelectorAll('#connections line');
    const neurons = document.querySelectorAll('circle');
    
    // Reset
    connections.forEach(line => {
        line.style.stroke = '#ccc';
        line.style.strokeWidth = '1';
    });
    
    neurons.forEach(neuron => {
        neuron.style.opacity = '0.5';
    });
    
    // Animate forward propagation
    setTimeout(() => {
        // Input layer activation
        document.querySelectorAll('#inputLayer circle').forEach(neuron => {
            neuron.style.opacity = '1';
        });
    }, 100);
    
    setTimeout(() => {
        // Input to hidden connections
        for (let i = 0; i < 12; i++) {
            connections[i].style.stroke = '#667eea';
            connections[i].style.strokeWidth = '2';
        }
    }, 300);
    
    setTimeout(() => {
        // Hidden layer activation
        document.querySelectorAll('#hiddenLayer circle').forEach(neuron => {
            neuron.style.opacity = '1';
        });
    }, 500);
    
    setTimeout(() => {
        // Hidden to output connections
        for (let i = 12; i < connections.length; i++) {
            connections[i].style.stroke = '#28a745';
            connections[i].style.strokeWidth = '2';
        }
    }, 700);
    
    setTimeout(() => {
        // Output layer activation
        document.querySelectorAll('#outputLayer circle').forEach(neuron => {
            neuron.style.opacity = '1';
        });
    }, 900);
}

// ==================== RANDOM FOREST ====================
function generateRandomForest() {
    const container = document.getElementById('randomForestViz');
    
    // Implementar votação mais realista baseada em diferentes features
    const numTrees = 5;
    const features = ['Score', 'Renda', 'Idade', 'Histórico', 'Garantias'];
    const decisions = [];
    const treeFeatures = [];
    let approvedCount = 0;
    
    // Cada árvore usa features diferentes e tem probabilidades diferentes
    const baseApprovalRate = 0.4 + Math.random() * 0.4; // 40-80%
    
    for (let i = 0; i < numTrees; i++) {
        const treeRate = baseApprovalRate + (Math.random() - 0.5) * 0.3;
        const isApproved = Math.random() < Math.max(0.1, Math.min(0.9, treeRate));
        decisions.push(isApproved ? '✅' : '❌');
        treeFeatures.push(features[i]);
        if (isApproved) approvedCount++;
    }
    
    const finalDecision = approvedCount > numTrees / 2;
    const confidence = Math.round((Math.max(approvedCount, numTrees - approvedCount) / numTrees) * 100);
    
    // Calcular métricas educativas
    const oobError = (15 + Math.random() * 10).toFixed(1); // Out-of-bag error
    const featureImportance = Math.random().toFixed(3);
    
    const scenarios = [
        { name: "Aprovação de Crédito", icon: "💳" },
        { name: "Diagnóstico Médico", icon: "🏥" },
        { name: "Detecção de Fraude", icon: "🔍" },
        { name: "Classificação de Risco", icon: "⚠️" },
        { name: "Recomendação Personalizada", icon: "🎯" }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    container.innerHTML = `
        <div class="forest-container">
            <div class="forest-title">
                <strong>${scenario.icon} Random Forest: ${scenario.name}</strong><br>
                <small style="color: #666;">Ensemble de ${numTrees} Árvores Especializadas</small>
            </div>
            
            <div class="algorithm-metrics">
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="metric-value">${confidence}%</div>
                        <div class="metric-label">Confiança</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${oobError}%</div>
                        <div class="metric-label">OOB Error</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${featureImportance}</div>
                        <div class="metric-label">Feature Importance</div>
                    </div>
                </div>
            </div>
            
            <div class="forest-trees">
                ${generateAdvancedMiniTrees(decisions, treeFeatures)}
            </div>
            
            <div class="forest-result ${finalDecision ? 'forest-result-approved' : 'forest-result-denied'}">
                <strong>Votação por Maioria:</strong><br>
                ${generateDetailedVotingSummary(decisions, approvedCount, treeFeatures)}<br>
                <strong>Resultado Final: ${finalDecision ? '✅ APROVADO' : '❌ NEGADO'}</strong><br>
                <small>Consenso: ${confidence}% (${approvedCount}/${numTrees} árvores)</small>
            </div>
        </div>
    `;
}

function generateAdvancedMiniTrees(decisions, features) {
    let trees = '';
    
    for (let i = 0; i < decisions.length; i++) {
        const treeColor = decisions[i] === '✅' ? '#28a745' : '#dc3545';
        const resultText = decisions[i] === '✅' ? 'Aprova' : 'Rejeita';
        
        trees += `
            <div class="mini-tree">
                <div class="mini-tree-header">
                    Árvore ${i + 1}<br>
                    <small>Foca: ${features[i]}</small>
                </div>
                <div class="mini-tree-icon">🌳</div>
                <div class="mini-tree-result" style="background: ${treeColor};">
                    ${resultText}
                </div>
            </div>
        `;
    }
    
    return trees;
}

function generateDetailedVotingSummary(decisions, approvedCount, features) {
    const rejectedCount = decisions.length - approvedCount;
    const approvedFeatures = features.filter((_, i) => decisions[i] === '✅');
    const rejectedFeatures = features.filter((_, i) => decisions[i] === '❌');
    
    return `
        <strong>Aprovaram (${approvedCount}):</strong> ${approvedFeatures.join(', ')}<br>
        <strong>Rejeitaram (${rejectedCount}):</strong> ${rejectedFeatures.join(', ')}
    `;
}

// ==================== GRADIENT BOOSTING ====================
function generateGradientBoosting() {
    const container = document.getElementById('gradientBoostingViz');
    
    // Simular iterações de gradient boosting
    const iterations = 4;
    const initialError = 0.8 + Math.random() * 0.15; // 80-95% erro inicial
    let currentError = initialError;
    const learningRate = 0.2 + Math.random() * 0.3; // 0.2-0.5
    
    const scenarios = [
        { name: "Previsão de Preços", icon: "💰", metric: "RMSE" },
        { name: "Score de Risco", icon: "⚠️", metric: "AUC" },
        { name: "Demanda de Produto", icon: "📦", metric: "MAE" },
        { name: "Classificação de Qualidade", icon: "⭐", metric: "Accuracy" },
        { name: "Detecção de Anomalias", icon: "🔍", metric: "F1-Score" }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    let iterationsHtml = '';
    const errorHistory = [currentError];
    
    for (let i = 1; i <= iterations; i++) {
        // Simular melhoria com diminishing returns
        const improvement = learningRate * currentError * (1 - i * 0.15);
        currentError = Math.max(0.05, currentError - improvement);
        errorHistory.push(currentError);
        
        const errorReduction = ((errorHistory[i-1] - currentError) / errorHistory[i-1] * 100).toFixed(1);
        
        iterationsHtml += `
            <div class="boosting-iteration">
                <div class="iteration-header">
                    <span>Modelo ${i}</span>
                    <span>-${errorReduction}% erro</span>
                </div>
                <div class="error-bar improving" style="width: ${(1 - currentError) * 100}%"></div>
                <div class="iteration-details">
                    <span>${scenario.metric}: ${(1 - currentError).toFixed(3)}</span>
                    <span>Taxa: ${learningRate.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
    
    const finalAccuracy = ((1 - currentError) * 100).toFixed(1);
    const totalImprovement = ((1 - currentError) / (1 - initialError) * 100 - 100).toFixed(1);
    
    container.innerHTML = `
        <div class="boosting-container">
            <div class="boosting-title">
                <strong>${scenario.icon} Gradient Boosting: ${scenario.name}</strong><br>
                <small style="color: #666;">Aprendizado Sequencial com Correção de Erros</small>
            </div>
            
            <div class="algorithm-metrics">
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="metric-value">${finalAccuracy}%</div>
                        <div class="metric-label">Performance Final</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${learningRate.toFixed(2)}</div>
                        <div class="metric-label">Learning Rate</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">+${totalImprovement}%</div>
                        <div class="metric-label">Melhoria Total</div>
                    </div>
                </div>
            </div>
            
            <div class="model-sequence">
                <div class="model-step base">Base</div>
                <div class="model-step boosting">Boost 1</div>
                <div class="model-step boosting">Boost 2</div>
                <div class="model-step boosting">Boost 3</div>
                <div class="model-step final">Final</div>
            </div>
            
            ${iterationsHtml}
            
            <div class="boosting-final">
                <strong>Ensemble Final:</strong><br>
                Modelo Base + ${iterations} Correções Sequenciais<br>
                <strong>Performance: ${finalAccuracy}% (${scenario.metric})</strong>
            </div>
        </div>
    `;
}

// ==================== INITIALIZATION ====================
function initializeCharts() {
    initializeLinearRegression();
    initializeLogisticRegression();
    initializeKMeans();
}

// Funções para botões
function generateLinearRegressionData() {
    if (linearRegressionChart) {
        const data = [];
        const lineData = [];
        
        // Gerar novos dados
        for (let i = 0; i < 30; i++) {
            const size = Math.random() * 180 + 20;
            const price = size * (3.5 + Math.random()) + Math.random() * 300 + 50;
            data.push({x: size, y: price});
        }
        
        // Nova linha de regressão
        const slope = 3.5 + Math.random();
        const intercept = 100 + Math.random() * 100;
        lineData.push({x: 20, y: 20 * slope + intercept});
        lineData.push({x: 200, y: 200 * slope + intercept});
        
        linearRegressionChart.data.datasets[0].data = data;
        linearRegressionChart.data.datasets[1].data = lineData;
        linearRegressionChart.update();
    }
}

function generateLogisticRegressionData() {
    if (logisticRegressionChart) {
        const approvedData = [];
        const deniedData = [];
        const curveData = [];
        
        const threshold = 500 + Math.random() * 200; // Threshold variável
        
        for (let i = 0; i < 50; i++) {
            const score = Math.random() * 550 + 300;
            const probability = 1 / (1 + Math.exp(-(score - threshold) / 50));
            const approved = Math.random() < probability ? 1 : 0;
            
            if (approved) {
                approvedData.push({x: score, y: 1});
            } else {
                deniedData.push({x: score, y: 0});
            }
        }
        
        for (let x = 300; x <= 850; x += 10) {
            const y = 1 / (1 + Math.exp(-(x - threshold) / 50));
            curveData.push({x: x, y: y});
        }
        
        logisticRegressionChart.data.datasets[0].data = approvedData;
        logisticRegressionChart.data.datasets[1].data = deniedData;
        logisticRegressionChart.data.datasets[2].data = curveData;
        logisticRegressionChart.update();
    }
}
