import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const PlayerForm = ({ addPlayer, updatePlayer, player, onClose }) => {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [games, setGames] = useState("");
  const [goals, setGoals] = useState("");
  const [assists, setAssists] = useState("");
  const [yellowCard, setYellowCard] = useState("");
  const [redCard, setRedCard] = useState("");

  useEffect(() => {
    if (player) {
      setName(player.name);
      setSeason(player.season);
      setGames(player.games);
      setGoals(player.goals);
      setAssists(player.assists);
      setYellowCard(player.yellowCard);
      setRedCard(player.redCard);
    }
  }, [player]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerData = {
      name,
      season,
      games: parseInt(games),
      goals: parseInt(goals),
      assists: parseInt(assists),
      yellowCard: parseInt(yellowCard),
      redCard: parseInt(redCard),
    };

    if (player) {
      playerData.id = player.id;
      updatePlayer(playerData);
    } else {
      addPlayer(playerData);
    }

    setName("");
    setSeason("");
    setGames("");
    setGoals("");
    setAssists("");
    setYellowCard("");
    setRedCard("");
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>اسم اللاعب</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="season">
        <Form.Label>الموسم</Form.Label>
        <Form.Control
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="games">
        <Form.Label>المباريات</Form.Label>
        <Form.Control
          type="number"
          value={games}
          onChange={(e) => setGames(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="goals">
        <Form.Label>الأهداف</Form.Label>
        <Form.Control
          type="number"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="assists">
        <Form.Label>التمريرات الحاسمة</Form.Label>
        <Form.Control
          type="number"
          value={assists}
          onChange={(e) => setAssists(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="yellowCard">
        <Form.Label>البطاقات الصفراء</Form.Label>
        <Form.Control
          type="number"
          value={yellowCard}
          onChange={(e) => setYellowCard(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="redCard">
        <Form.Label>البطاقات الحمراء</Form.Label>
        <Form.Control
          type="number"
          value={redCard}
          onChange={(e) => setRedCard(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {player ? "تعديل اللاعب" : "إضافة اللاعب"}
      </Button>
    </Form>
  );
};

export default PlayerForm;
