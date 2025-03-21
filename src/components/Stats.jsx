import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import PlayerForm from "./PlayerForm";
import supabase from "../supabaseClient";

const Stats = () => {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editPlayer, setEditPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from("Players").select("*");
      console.log(data);

      if (error) {
        console.error("Error fetching players:", error);
      } else {
        setPlayers(data);
      }
    };

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    fetchPlayers();
    checkUser();
  }, []);

  const addPlayer = async (newPlayer) => {
    const { data, error } = await supabase
      .from("Players")
      .insert([newPlayer])
      .select();
    if (error) {
      console.error("Error adding player:", error);
    } else {
      setPlayers([...players, ...data]);
    }
  };

  const updatePlayer = async (updatedPlayer) => {
    const { data, error } = await supabase
      .from("Players")
      .update(updatedPlayer)
      .eq("id", updatedPlayer.id)
      .select();
    if (error) {
      console.error("Error updating player:", error);
    } else {
      setPlayers(
        players.map((player) =>
          player.id === updatedPlayer.id ? data[0] : player
        )
      );
    }
  };

  const deleteRow = async (playerId) => {
    console.log(+playerId);

    const { error } = await supabase
      .from("Players")
      .delete()
      .eq("id", +playerId);
    if (error) {
      console.error("Error deleting player:", error);
    } else {
      setPlayers(players.filter((player) => player.id !== playerId));
    }
  };

  return (
    <div>
      <Container className="mt-5">
        {isLoggedIn && (
          <>
            <div className="d-flex justify-content-end">
              <Button variant="danger" onClick={() => setShowModal(true)}>
                إضافة لاعب جديد
              </Button>
            </div>
            <Modal
              show={showModal || !!editPlayer}
              onHide={() => {
                setShowModal(false);
                setEditPlayer(null);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {editPlayer ? "تعديل لاعب" : "إضافة لاعب جديد"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PlayerForm
                  addPlayer={addPlayer}
                  updatePlayer={updatePlayer}
                  player={editPlayer}
                  onClose={() => {
                    setShowModal(false);
                    setEditPlayer(null);
                  }}
                />
              </Modal.Body>
            </Modal>
          </>
        )}

        <Table striped bordered hover className="mt-4 text-center">
          <thead className="table-dark">
            <tr>
              {isLoggedIn && <th>إجراءات</th>}
              <th>الكروت الحمراء</th>
              <th>الكروت الصفراء</th>
              <th>التمريرات الحاسمة</th>
              <th>الأهداف</th>
              <th>المشاركات</th>
              <th>الموسم</th>
              <th>اسم اللاعب</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                {isLoggedIn && (
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteRow(player.id)}
                    >
                      حذف
                    </Button>
                    <Button
                      className="mr-2"
                      variant="warning"
                      size="sm"
                      onClick={() => setEditPlayer(player)}
                    >
                      تعديل
                    </Button>
                  </td>
                )}
                <td>{player.redCard}</td>
                <td>{player.yellowCard}</td>
                <td>{player.assists}</td>
                <td>{player.goals}</td>
                <td>{player.games}</td>
                <td>{player.season}</td>
                <td>{player.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Stats;
