import React from "react";
import "./CardComponents.css";

// SimpleCard - Minimalist design
export function SimpleCard({ title, width = "200px", height = "120px" }) {
  return (
    <div
      className="simple-card"
      style={{
        width,
        height,
        flexShrink: 0, // Add this
      }}
    >
      <div className="simple-card-content">
        <h3 className="simple-card-title">{title}</h3>
        <div className="simple-card-body">
          <p>Simple & Clean</p>
          <span className="simple-badge">Basic</span>
        </div>
      </div>
    </div>
  );
}

// ComplexCard - Detailed design with more elements
export function ComplexCard({ title, width = "280px", height = "180px" }) {
  return (
    <div
      className="complex-card"
      style={{
        width,
        height,
        flexShrink: 0, // Add this
      }}
    >
      <div className="complex-card-header">
        <div className="complex-card-avatar">
          <span>💎</span>
        </div>
        <div className="complex-card-title-section">
          <h3 className="complex-card-title">{title}</h3>
          <span className="complex-card-subtitle">Premium Card</span>
        </div>
        <div className="complex-card-menu">⋯</div>
      </div>

      <div className="complex-card-body">
        <div className="complex-card-stats">
          <div className="stat">
            <span className="stat-value">24</span>
            <span className="stat-label">Tasks</span>
          </div>
          <div className="stat">
            <span className="stat-value">85%</span>
            <span className="stat-label">Progress</span>
          </div>
        </div>

        <div className="complex-card-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "85%" }}></div>
          </div>
        </div>

        <div className="complex-card-tags">
          <span className="tag">Urgent</span>
          <span className="tag">Feature</span>
        </div>
      </div>

      <div className="complex-card-footer">
        <button className="complex-card-button">View Details</button>
        <div className="complex-card-actions">
          <span>⭐</span>
          <span>🔗</span>
        </div>
      </div>
    </div>
  );
}
