import React from 'react';

const Dashboard = () => {
  return (
    <section id="dashboard" className="section-active">
      <h2>Tablero</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Balance Actual</h3>
          <p className="balance">$0.00</p>
        </div>
        <div className="stat-card">
          <h3>Ingresos (mes actual)</h3>
          <p className="income">$0.00</p>
        </div>
        <div className="stat-card">
          <h3>Gastos (mes actual)</h3>
          <p className="expenses">$0.00</p>
        </div>
        <div className="stat-card">
          <h3>Ahorros</h3>
          <p className="savings">$0.00</p>
        </div>
      </div>

      <div className="chart-container">
        <div>
          <h3>Flujo de Efectivo</h3>
          <canvas id="cashFlowChart"></canvas>
        </div>
        <div>
          <h3>Distribución de Gastos</h3>
          <canvas id="expensesChart"></canvas>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
