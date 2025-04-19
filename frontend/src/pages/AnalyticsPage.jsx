import React, { useEffect, useState } from "react";
import axios from "axios";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/analytics/", { withCredentials: true })
      .then(res => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!analytics) return <p>Failed to load analytics.</p>;

  const renderHeatmap = () => {
    if (!Array.isArray(analytics.activity_heatmap)) {
      return <p>No activity data available.</p>;
    }
  
    const now = new Date();
    const currentMonth = now.getMonth(); 
    const currentYear = now.getFullYear();
  
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
    const lastDayOfMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 0));
    const daysInMonth = lastDayOfMonth.getDate();
  
    const firstDayOfWeek = firstDayOfMonth.getUTCDay();
  
    const filteredData = analytics.activity_heatmap.filter(item => {
      const activityDate = new Date(item.date);
  
      const activityDateUTC = new Date(Date.UTC(
        activityDate.getFullYear(),
        activityDate.getMonth(),
        activityDate.getDate()
      ));
  
      return activityDateUTC.getUTCFullYear() === currentYear && activityDateUTC.getUTCMonth() === currentMonth;
    });
  
    const daysGrid = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysGrid.push(null);
    }
  
    for (let i = 0; i < daysInMonth; i++) {
      const currentDate = new Date(Date.UTC(currentYear, currentMonth, i + 1));
      const dateString = currentDate.toISOString().split("T")[0];
  
      const activity = filteredData.find(item => item.date === dateString);
      const attempts = activity ? activity.attempts : 0;
  
      const opacity = Math.min(attempts / 4, 1); 
      const bgColor = attempts === 0 ? "#e0e0e0" : `rgba(0, 128, 255, ${opacity})`;
  
      daysGrid.push({ dateString, bgColor, attempts, day: i + 1 });
    }
  
    const rows = [];
    let currentRow = [];
    
    daysGrid.forEach((day, index) => {
      currentRow.push(day);
      if (currentRow.length === 7 || index === daysGrid.length - 1) {
        rows.push(currentRow);
        currentRow = [];
      }
    });
  
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginTop: "10px" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} style={{ textAlign: "center", fontWeight: "bold" }}>{day}</div>
        ))}
  
        {rows.map((week, rowIndex) => (
          week.map((day, dayIndex) => (
            day ? (
              <div
                key={`${rowIndex}-${dayIndex}`}
                title={`${day.dateString}: ${day.attempts} quiz${day.attempts !== 1 ? "zes" : ""}`}
                style={{
                  width: "70px",
                  height: "40px",
                  backgroundColor: day.bgColor,
                  borderRadius: "4px",
                  textAlign: "center",
                  lineHeight: "20px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: "10px", position: "absolute", top: "3px", left: "3px" }}>
                  {day.day}
                </div>
                {day.attempts > 0 && (
                  <div style={{ position: "absolute", bottom: "3px", left: "3px", fontSize: "10px" }}>
                    {day.attempts} Attempts
                  </div>
                )}
              </div>
            ) : (
              <div key={`${rowIndex}-${dayIndex}`} style={{ width: "70px", height: "40px" }}></div>
            )
          ))
        ))}
      </div>
    );
  };
  

  return (
    <div>
      <h2>Your Analytics</h2>
      <ul>
        <li><strong>Highest Scoring Topic:</strong> {analytics.highest_scoring_topic?.topic || "N/A"}</li>
        <li><strong>Lowest Scoring Topic:</strong> {analytics.lowest_scoring_topic?.topic || "N/A"}</li>
        <li><strong>Average Score:</strong> {analytics.average_score.toFixed(2)}%</li>
        <li><strong>Total Quizzes Taken:</strong> {analytics.total_quizzes_taken}</li>
        <li><strong>Most Improved Topic:</strong> {analytics.most_improved_topic?.topic || "N/A"}</li>
      </ul>

      <div style={{ marginTop: "30px" }}>
        <h3>Activity Heatmap</h3>
        {renderHeatmap()}
        <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>Each square represents a day’s quiz activity</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
