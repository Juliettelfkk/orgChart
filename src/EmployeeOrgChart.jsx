import React, { useCallback, useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import employees from "./data/employees";
import { Box, Card, useMediaQuery } from "@mui/material";
import { theme } from "./theme";

const EmployeeOrgChart = () => {
  const chartRef = useRef();

  // Responsive breakpoints
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  // Responsive dimensions
 const getResponsiveDimensions = useCallback(() => {
  if (isMobile) {
    return {
      nodeWidth: 180,
      nodeHeight: 120,
      childrenMargin: 30,        // was 30 → more vertical space
      compactMarginBetween: 25,  // was 15 → more sibling stacking space
      neighbourMargin: 30        // was 20 → more horizontal space
    };
  } else if (isTablet) {
    return {
      nodeWidth: 200,
      nodeHeight: 110,
      childrenMargin: 35,        // was 35
      compactMarginBetween: 30,  // was 18
      neighbourMargin: 40        // was 22
    };
  } else {
    return {
      nodeWidth: 240,
      nodeHeight: 130,
      childrenMargin: 50,        // was 50
      compactMarginBetween: 40,  // was 25
      neighbourMargin: 60        // was 30
    };
  }
}, [isMobile, isTablet]);


  const getDepartmentColor = (department) => {
    const colors = {
      Executive: theme.palette.primary.main,
      Technology: "#4caf50",
      Finance: "#ff9800",
      Marketing: "#9c27b0",
      HR: "#f44336",
    };
    return colors[department] || theme.palette.grey[400];
  };

  const renderChart = useCallback(() => {
    if (chartRef.current) {
      // Clear previous chart
      chartRef.current.innerHTML = '';
      
      const dimensions = getResponsiveDimensions();

      new OrgChart()
        .container(chartRef.current)
        .data(employees)
        .nodeWidth(() => dimensions.nodeWidth)
        .nodeHeight(() => dimensions.nodeHeight)
        .childrenMargin(() => dimensions.childrenMargin)
        .compactMarginBetween(() => dimensions.compactMarginBetween)
        .neighbourMargin(() => dimensions.neighbourMargin)
       
        // Add these centering properties
        .initialZoom(0.8) // Slightly zoom out to ensure full chart is visible
      // Fit the chart to container
        .nodeContent((d) => {
          const departmentColor = getDepartmentColor(d.data.department);

          return `
            <div style="
              width: 100%;
              height: 100%;
              padding: ${isMobile ? "8px" : "12px"};
              border-radius: 12px;
              background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
              box-shadow: 0 4px 20px rgba(0,0,0,0.12);
              border: 2px solid ${departmentColor}20;
              position: relative;
              overflow: hidden;
              font-family: 'Roboto', sans-serif;
              transition: all 0.3s ease;
              cursor: pointer;
            ">
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, ${departmentColor}, ${departmentColor}80);
              "></div>
              <div style="
                width: ${isMobile ? "32px" : "40px"};
                height: ${isMobile ? "32px" : "40px"};
                border-radius: 50%;
                background: linear-gradient(135deg, ${departmentColor}, ${departmentColor}cc);
                margin: 0 auto 8px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: ${isMobile ? "14px" : "16px"};
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              ">
                ${d.data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </div>
              <div style="
                color: ${theme.palette.text.primary};
                font-size: ${isMobile ? "13px" : "14px"};
                font-weight: 600;
                text-align: center;
                margin-bottom: 4px;
                line-height: 1.2;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              ">
                ${d.data.name}
              </div>
              <div style="
                color: ${theme.palette.text.secondary};
                font-size: ${isMobile ? "11px" : "12px"};
                font-weight: 400;
                text-align: center;
                line-height: 1.3;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              ">
                ${d.data.position}
              </div>
              <div style="
                position: absolute;
                bottom: 8px;
                right: 8px;
                background: ${departmentColor}15;
                color: ${departmentColor};
                padding: 2px 6px;
                border-radius: 8px;
                font-size: 9px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">
                ${d.data.department}
              </div>
            </div>
          `;
        })
        .render().fit();
    }
  }, [getResponsiveDimensions, isMobile]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  useEffect(() => {
    const handleResize = () => setTimeout(renderChart, 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderChart]);

  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      <Card
        elevation={4}
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "transparent", 
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: theme.palette.background.paper,
            position: "relative",
            display: "flex", 
            justifyContent: "center", 
            alignItems: "flex-start",
          }}
        >
          <div
            ref={chartRef}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "400px",
              position: "relative",
              padding: isMobile ? "20px" : "40px",
              display: "flex",
              justifyContent: "center", 
              alignItems: "flex-start",
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default EmployeeOrgChart;