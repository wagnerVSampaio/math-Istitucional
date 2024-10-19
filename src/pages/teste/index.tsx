import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import styled from 'styled-components';

const ImageCover = styled.div`
    position: relative;
    // Adicione outros estilos que desejar
`;

const UploadButton = styled.input`
    display: none; // Esconde o input file
`;

const ButtonCoverLabel = styled.label`
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    // Adicione outros estilos que desejar
`;

const UploadForm: React.FC = () => {
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                setCoverImage(reader.result as string);

                // Enviar a imagem para a API
                const formData = new FormData();
                formData.append('cover_photo', file);

                try {
                    const response = await fetch('http://localhost:3002/api/updatePhoto/2', {
                        method: 'PUT',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setMessage('Foto de capa atualizada com sucesso!');
                        console.log('Resposta do servidor:', data);
                    } else {
                        setMessage('Erro ao atualizar a foto de capa.');
                    }
                } catch (error) {
                    console.error('Erro ao enviar a foto de capa:', error);
                    setMessage('Erro ao enviar a foto de capa.');
                }
            };

            reader.readAsDataURL(file); // Lê o arquivo como uma URL
        }
    };

    return (
        <ImageCover className="relative">
            <img
                src={coverImage || "/cover.png"}
                alt="Cover"
                className="w-full h-[100px] object-cover"
            />
            <UploadButton
                type="file"
                accept="image/*"
                id="coverImageUpload"
                onChange={handleCoverImageChange}
            />
            <ButtonCoverLabel htmlFor="coverImageUpload">
                <FaCamera />
                <span className="ml-2">Adicionar foto de capa</span>
            </ButtonCoverLabel>
            {message && <p>{message}</p>} {/* Exibir mensagem ao usuário */}
        </ImageCover>
    );
};

export default UploadForm;
