import { useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

export default function Home() {
  const [region, setRegion] = useState("すべて");
  const [field, setField] = useState("すべて");
  const [data, setData] = useState([]);

  const fetchUniversities = async () => {
    const res = await fetch(`/api/universities?region=${region}&field=${field}`);
    const json = await res.json();
    json.sort((a, b) => a.倍率 - b.倍率);
    setData(json);
  };

  return (
    <Container 
      maxWidth="md"
      sx={{
            mt: 4,
            bgcolor: "#f5f5f5",   // 薄いグレー
            minHeight: "100vh",   // 画面全体の高さ確保
            padding: 3,           // Containerのpadding上げると余白もできる
        }}
    >
      <Typography variant="h4" gutterBottom>
        公募推薦 志望校発見サイト
      </Typography>
      <Typography variant="body1" gutterBottom>
        地域と分野を選んで検索！
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>地域</InputLabel>
          <Select
            value={region}
            label="地域"
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value="すべて">すべて</MenuItem>
            <MenuItem value="関東">関東</MenuItem>
            <MenuItem value="関西">関西</MenuItem>
            <MenuItem value="東北">東北</MenuItem>
            <MenuItem value="九州">九州</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>分野</InputLabel>
          <Select
            value={field}
            label="分野"
            onChange={(e) => setField(e.target.value)}
          >
            <MenuItem value="すべて">すべて</MenuItem>
            <MenuItem value="情報・工学">情報・工学</MenuItem>
            <MenuItem value="経済・経営">経済・経営</MenuItem>
            <MenuItem value="文学">文学</MenuItem>
            <MenuItem value="教育">教育</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="large"
          onClick={fetchUniversities}
          sx={{ minWidth: 120 }}
        >
          検索
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>大学名</TableCell>
              <TableCell>学部学科</TableCell>
              <TableCell>倍率</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  条件を選んで検索してください
                </TableCell>
              </TableRow>
            ) : (
              data.map((u, i) => (
                <TableRow
                  key={i}
                  sx={{
                    backgroundColor: u.倍率 <= 1.5 ? "#e0f7e9" : "transparent",
                  }}
                >
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.faculty}</TableCell>
                  <TableCell>{u.倍率}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}